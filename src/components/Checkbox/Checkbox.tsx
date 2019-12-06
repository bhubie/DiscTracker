/* eslint-disable jsx-a11y/label-has-for */
import * as React from 'react';

export interface ICheckbox {
    id: string
    name: string
    label: string
    checked: boolean
    onChange: (e: any) => void
}

const Checkbox: React.FC<ICheckbox>= ({id, checked, onChange, name, label}) => {
  const cssClass = 'is-checkradio is-primary';
  return (
    <div>
      <input
        className={cssClass}
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        data-testid={id}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};


export default Checkbox;
