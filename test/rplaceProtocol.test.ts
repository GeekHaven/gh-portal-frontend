import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  TOTAL_PIXELS,
  EXPECTED_SNAPSHOT_BYTES,
  BACKEND_PALETTE,
  PALETTE_U32,
  PALETTE_CSS,
  unpackSnapshot,
  findClosestPaletteColor,
  drawPixel,
} from '../src/utils/rplaceProtocol';
import {
  resolveCanvasConfig,
  parsePositiveInt,
  parsePositiveFloat,
} from '../src/config/canvas.config';

describe('R/Place Frontend Protocol & Configuration Tests', () => {
  describe('Canvas Configuration & Dimension Resolvers', () => {
    test('default configuration matches 1000x600 specification', () => {
      assert.strictEqual(CANVAS_WIDTH, 1000);
      assert.strictEqual(CANVAS_HEIGHT, 600);
      assert.strictEqual(TOTAL_PIXELS, 600000);
      assert.strictEqual(EXPECTED_SNAPSHOT_BYTES, 300000);
    });

    test('resolveCanvasConfig resolves default values without environment variables', () => {
      const config = resolveCanvasConfig({});
      assert.strictEqual(config.width, 1000);
      assert.strictEqual(config.height, 600);
      assert.strictEqual(config.totalPixels, 600000);
      assert.strictEqual(config.expectedSnapshotBytes, 300000);
      assert.strictEqual(config.zoom.default, 1);
      assert.strictEqual(config.zoom.min, 1);
      assert.strictEqual(config.zoom.max, 40);
      assert.strictEqual(config.zoom.step, 0.25);
    });

    test('resolveCanvasConfig respects custom dimensions and rounds expectedSnapshotBytes correctly', () => {
      // 501 x 300 = 150,300 pixels -> ceil(150300 / 2) = 75,150 bytes
      const configOdd = resolveCanvasConfig({
        CANVAS_WIDTH: '501',
        CANVAS_HEIGHT: '300',
      });
      assert.strictEqual(configOdd.width, 501);
      assert.strictEqual(configOdd.height, 300);
      assert.strictEqual(configOdd.totalPixels, 150300);
      assert.strictEqual(configOdd.expectedSnapshotBytes, 75150);

      // 501 x 301 = 150,801 pixels -> ceil(150801 / 2) = 75,401 bytes
      const configOddBoth = resolveCanvasConfig({
        NEXT_PUBLIC_CANVAS_WIDTH: '501',
        NEXT_PUBLIC_CANVAS_HEIGHT: '301',
      });
      assert.strictEqual(configOddBoth.totalPixels, 150801);
      assert.strictEqual(configOddBoth.expectedSnapshotBytes, 75401);
    });

    test('parsePositiveInt handles fallbacks and boundary limits safely', () => {
      assert.strictEqual(parsePositiveInt(undefined, 1000), 1000);
      assert.strictEqual(parsePositiveInt('', 1000), 1000);
      assert.strictEqual(parsePositiveInt('abc', 1000), 1000);
      assert.strictEqual(parsePositiveInt('-10', 1000), 1000);
      assert.strictEqual(parsePositiveInt('0', 1000, 1, 100), 1000); // 0 < min(1) -> fallback
      assert.strictEqual(parsePositiveInt('500', 1000, 1, 10000), 500);
      assert.strictEqual(parsePositiveInt('999999', 1000, 1, 5000), 1000); // 999999 > max(5000) -> fallback
    });

    test('parsePositiveFloat handles fallbacks and boundaries', () => {
      assert.strictEqual(parsePositiveFloat(undefined, 1.5), 1.5);
      assert.strictEqual(parsePositiveFloat('invalid', 1.5), 1.5);
      assert.strictEqual(parsePositiveFloat('2.75', 1.5, 0.1, 10), 2.75);
      assert.strictEqual(parsePositiveFloat('-0.5', 1.5, 0.1, 10), 1.5);
    });
  });

  describe('Palette & Color Encoding', () => {
    test('BACKEND_PALETTE defines exactly 16 colors matching backend indices', () => {
      assert.strictEqual(BACKEND_PALETTE.length, 16);
      assert.deepStrictEqual(BACKEND_PALETTE[0], [255, 255, 255]); // White
      assert.deepStrictEqual(BACKEND_PALETTE[1], [0, 0, 0]);       // Black
      assert.deepStrictEqual(BACKEND_PALETTE[2], [255, 0, 0]);     // Red
      assert.deepStrictEqual(BACKEND_PALETTE[3], [0, 255, 0]);     // Green
      assert.deepStrictEqual(BACKEND_PALETTE[4], [0, 0, 255]);     // Blue
      assert.deepStrictEqual(BACKEND_PALETTE[15], [255, 215, 0]);  // Gold
    });

    test('PALETTE_U32 maps RGBA to little-endian 32-bit words correctly', () => {
      assert.strictEqual(PALETTE_U32.length, 16);
      // White: [255, 255, 255], Alpha=255 -> 0xFFFFFFFF
      assert.strictEqual(PALETTE_U32[0] >>> 0, 0xffffffff);

      // Black: [0, 0, 0], Alpha=255 -> (255 << 24) = 0xFF000000
      assert.strictEqual(PALETTE_U32[1] >>> 0, 0xff000000);

      // Red: [255, 0, 0], Alpha=255 -> (255 << 24) | 255 = 0xFF0000FF
      assert.strictEqual(PALETTE_U32[2] >>> 0, 0xff0000ff);

      // Blue: [0, 0, 255], Alpha=255 -> (255 << 24) | (255 << 16) = 0xFFFF0000
      assert.strictEqual(PALETTE_U32[4] >>> 0, 0xffff0000);
    });

    test('PALETTE_CSS contains valid rgb() strings for all 16 colors', () => {
      assert.strictEqual(PALETTE_CSS.length, 16);
      assert.strictEqual(PALETTE_CSS[0], 'rgb(255,255,255)');
      assert.strictEqual(PALETTE_CSS[1], 'rgb(0,0,0)');
      assert.strictEqual(PALETTE_CSS[2], 'rgb(255,0,0)');
      assert.strictEqual(PALETTE_CSS[15], 'rgb(255,215,0)');
    });

    test('findClosestPaletteColor maps exact palette RGB values to exact indices', () => {
      for (let i = 0; i < BACKEND_PALETTE.length; i++) {
        const [r, g, b] = BACKEND_PALETTE[i];
        const match = findClosestPaletteColor(r, g, b);
        assert.strictEqual(match, i, `Color index ${i} should match itself`);
      }
    });

    test('findClosestPaletteColor maps near-matches to closest palette index', () => {
      // Near red [250, 5, 5] -> Red (2)
      assert.strictEqual(findClosestPaletteColor(250, 5, 5), 2);
      // Near white [250, 250, 250] -> White (0)
      assert.strictEqual(findClosestPaletteColor(250, 250, 250), 0);
      // Near black [5, 5, 5] -> Black (1)
      assert.strictEqual(findClosestPaletteColor(5, 5, 5), 1);
    });
  });

  describe('Snapshot Unpacking & Binary Protocol Compatibility', () => {
    test('unpackSnapshot handles packed 4-bit nibbles with high-nibble first ordering', () => {
      // Byte 0: high nibble = 2 (Red), low nibble = 4 (Blue)
      // Byte 1: high nibble = 1 (Black), low nibble = 0 (White)
      const packedBuffer = new Uint8Array([
        (2 << 4) | 4,
        (1 << 4) | 0,
      ]).buffer;

      const imageData = unpackSnapshot(packedBuffer);
      const pixels32 = new Uint32Array(imageData.data.buffer);

      assert.strictEqual(pixels32[0] >>> 0, PALETTE_U32[2] >>> 0, 'Pixel 0 must match Red');
      assert.strictEqual(pixels32[1] >>> 0, PALETTE_U32[4] >>> 0, 'Pixel 1 must match Blue');
      assert.strictEqual(pixels32[2] >>> 0, PALETTE_U32[1] >>> 0, 'Pixel 2 must match Black');
      assert.strictEqual(pixels32[3] >>> 0, PALETTE_U32[0] >>> 0, 'Pixel 3 must match White');
    });

    test('unpackSnapshot correctly decodes full 300,000-byte board buffer without buffer overflow', () => {
      const fullBuffer = new Uint8Array(EXPECTED_SNAPSHOT_BYTES);
      // Fill alternating: byte = (5 << 4) | 7 => Pixel 2k = Yellow (5), Pixel 2k+1 = Purple (7)
      fullBuffer.fill((5 << 4) | 7);

      const imageData = unpackSnapshot(fullBuffer.buffer);
      assert.strictEqual(imageData.width, CANVAS_WIDTH);
      assert.strictEqual(imageData.height, CANVAS_HEIGHT);
      assert.strictEqual(imageData.data.length, TOTAL_PIXELS * 4);

      const pixels32 = new Uint32Array(imageData.data.buffer);
      assert.strictEqual(pixels32[0] >>> 0, PALETTE_U32[5] >>> 0);
      assert.strictEqual(pixels32[1] >>> 0, PALETTE_U32[7] >>> 0);
      assert.strictEqual(pixels32[TOTAL_PIXELS - 2] >>> 0, PALETTE_U32[5] >>> 0);
      assert.strictEqual(pixels32[TOTAL_PIXELS - 1] >>> 0, PALETTE_U32[7] >>> 0);
    });

    test('Packing and unpacking symmetry: pack nibbles -> unpackSnapshot recovers exact colors', () => {
      const sampleIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      const packed = new Uint8Array(sampleIndices.length / 2);
      for (let i = 0; i < sampleIndices.length; i += 2) {
        packed[i / 2] = (sampleIndices[i] << 4) | sampleIndices[i + 1];
      }

      const decoded = unpackSnapshot(packed.buffer);
      const pixels32 = new Uint32Array(decoded.data.buffer);

      for (let i = 0; i < sampleIndices.length; i++) {
        assert.strictEqual(
          pixels32[i] >>> 0,
          PALETTE_U32[sampleIndices[i]] >>> 0,
          `Pixel ${i} must round-trip correctly`
        );
      }
    });

    test('drawPixel safely guards canvas bounds', () => {
      let fillRectCalled = false;
      const fakeCtx = {
        fillStyle: '',
        fillRect: () => {
          fillRectCalled = true;
        },
      } as unknown as CanvasRenderingContext2D;

      // Negative coordinates - should be ignored
      drawPixel(fakeCtx, -1, 10, 2);
      assert.strictEqual(fillRectCalled, false);

      drawPixel(fakeCtx, 10, -1, 2);
      assert.strictEqual(fillRectCalled, false);

      // Coordinates at or beyond bounds - should be ignored
      drawPixel(fakeCtx, CANVAS_WIDTH, 0, 2);
      assert.strictEqual(fillRectCalled, false);

      drawPixel(fakeCtx, 0, CANVAS_HEIGHT, 2);
      assert.strictEqual(fillRectCalled, false);

      // Valid coordinates - should draw
      drawPixel(fakeCtx, 100, 200, 3);
      assert.strictEqual(fillRectCalled, true);
      assert.strictEqual(fakeCtx.fillStyle, PALETTE_CSS[3]);
    });
  });
});
