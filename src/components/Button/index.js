import glamorous from 'glamorous';
import AppTheme from '../../AppTheme';

const colors = {
  primary: AppTheme.palette.primary1Color,
  accent: AppTheme.palette.accent1Color,
  text: '#FFF',
};


export default glamorous.button(
  {
    border: '10px none',
    boxSizing: 'border-box',
    display: 'inline-block',
    cursor: 'pointer',
    textDecoration: 'none',
    margin: '0px',
    padding: '0px 16px',
    outline: ' medium none currentcolor',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    position: 'relative',
    height: '36px',
    lineHeight: '36px',
    borderRadius: '2px',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    textAlign: 'center',
    textTransform: 'uppercase',
    boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
    color: AppTheme.palette.alternateTextColor || colors.text,
    ':hover': {
      opacity: 0.7,
      boxShadow: '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)',
    },
    ':focus': { outline: 0 },
    ':active': {
      transform: 'translateY(1px)',
    },
  },
  props => ({
    backgroundColor: colors[props.type] || colors.accent,
  }),
);

/*

  */
