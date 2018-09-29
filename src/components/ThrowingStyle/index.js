import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import glamorous, { Div } from 'glamorous';
import AppTheme from '../../AppTheme';
import { HeaderCardStyle, CardStyle } from '../../Utils/CardStyles';

export default class ThrowingStyle extends React.Component {
  handleChange = (e) => {
    const clickedOption = {
      value: e.target.id,
      label: e.target.name,
    };
    this.props.handleUpdateHand(this.props.id, clickedOption);
  }

  render() {
    const style = {
      marginTop: '10px',
      gridColumn: '1 / span 1',
      gridRow: 3,
    };

    const styleThrowingOptionsWrapper = {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '36px',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid rgba(0,0,0,.42)',
    };

    const Option = glamorous.div(
      {
        flex: '1',
        height: '100%',
        width: 'inherit',
        display: 'flex',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
      },
      ({ selected = 'L' }) => ({
        background: selected === this.props.hand.value ? AppTheme.palette.accent1Color : 'transperent',
        color: selected === this.props.hand.value ? AppTheme.palette.alternateTextColor : '#000',
      }),
    );
    const options = this.props.throwingStyleValues.map(o => (<Option selected={o.value} id={o.value} name={o.label}><Div id={o.value} name={o.label}>{o.label}</Div></Option>));
    // console.log('throwing style')
    // console.log(this.props.hand)
    return (
      <Div id="throwingStyle" css={style} >
        <Card style={CardStyle} initiallyExpanded>
          <CardHeader
            style={HeaderCardStyle}
            title="Throwing Style"
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            <Div css={styleThrowingOptionsWrapper} onClick={this.handleChange} >
              {options}
            </Div>
          </CardText>
        </Card>
      </Div>
    );
  }
}

ThrowingStyle.propTypes = {
  hand: PropTypes.objectOf(PropTypes.string).isRequired,
  handleUpdateHand: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  throwingStyleValues: PropTypes.arrayOf(PropTypes.object).isRequired,
};
