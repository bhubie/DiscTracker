import * as React from 'react';
import classNames from 'classnames';

export enum Color {
    White = 'is-white',
    Light = 'is-light',
    Dark = 'is-dark',
    Black = 'is-black',
    Text = 'is-text',
    Primary = 'is-primary',
    Link = 'is-link',
    Info = 'is-info',
    Warning = 'is-warning',
    Danger = 'is-danger'

}

export enum Size {
    Small = 'is-small',
    Medium = 'is-medium',
    Large = 'is-large',
    Normal = ''
}

export interface IButtonProps {
    color: Color
    size?: Size
    isFullWidth?: boolean
}

export const Button: React.FC<IButtonProps & JSX.IntrinsicElements['button']> = (props) => {
    
    const { color, size, children, isFullWidth, ...restProps } = props;

    const buttonCSSClass = classNames('button',
        color,
        size,
        {
            'is-fullwidth': isFullWidth
        }
    );
    
    return (
        <button {...restProps} className={buttonCSSClass}>
            {children}
        </button>
    )
}


