import { extendTheme, HTMLChakraProps, ThemingProps } from '@chakra-ui/react';
import { CardComponent } from './additions/card/card';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { inputStyles } from './components/input';
import { progressStyles } from './components/progress';
import { sliderStyles } from './components/slider';
import { textareaStyles } from './components/textarea';
import { switchStyles } from './components/switch';
import { linkStyles } from './components/link';
import { breakpoints } from './foundations/breakpoints';
import { globalStyles } from './styles';
import { opencodeTokens } from './opencode-tokens';

export default extendTheme(
	{ 
		breakpoints,
		config: {
			initialColorMode: 'light',
			useSystemColorMode: false,
		},
		styles: {
			global: {
				body: {
					bg: 'var(--bg)',
					color: 'var(--fg)',
					fontFamily: 'var(--f-body)',
					lineHeight: '1.75',
				}
			}
		},
		components: {
			Menu: {
				baseStyle: {
					list: {
						bg: 'var(--surface)',
						border: '1px solid var(--border)',
						boxShadow: 'var(--shadow)',
						borderRadius: '4px',
						py: '4px',
					},
					item: {
						bg: 'transparent',
						color: 'var(--fg)',
						fontSize: '13px',
						_hover: {
							bg: 'var(--surface-2)',
						},
						_focus: {
							bg: 'var(--surface-2)',
						}
					}
				}
			},
			Button: {
				baseStyle: {
					borderRadius: '4px',
					fontFamily: 'var(--f-body), sans-serif',
					fontWeight: '500',
					fontSize: '14px',
					transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
				},
				variants: {
					solid: {
						bg: 'var(--accent)',
						color: 'var(--accent-ink)',
						borderRadius: '4px',
						boxShadow: 'none',
						border: '1px solid var(--accent)',
						_hover: {
							bg: 'var(--accent-hover)',
							borderColor: 'var(--accent-hover)',
							boxShadow: 'none',
						},
						_active: {
							bg: 'var(--accent-hover)',
						}
					},
					ghost: {
						borderRadius: '4px',
						color: 'var(--muted)',
						_hover: {
							bg: 'var(--surface-2)',
							color: 'var(--fg)',
						}
					},
					outline: {
						borderRadius: '4px',
						border: '1px solid var(--border)',
						bg: 'var(--surface)',
						color: 'var(--fg)',
						boxShadow: 'none',
						_hover: {
							bg: 'var(--surface-2)',
							borderColor: 'var(--border-strong)',
							color: 'var(--fg)',
						}
					}
				}
			}
		}
	},
	globalStyles,
	badgeStyles,
	buttonStyles,
	linkStyles,
	progressStyles,
	sliderStyles,
	inputStyles,
	textareaStyles,
	switchStyles,
	CardComponent
);

export interface CustomCardProps extends HTMLChakraProps<'div'>, ThemingProps {}
