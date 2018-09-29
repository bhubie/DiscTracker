import React from 'react';
import PropTypes from 'prop-types';
import { Div, Table } from 'glamorous';
import Disc from './Disc/index';
import Type from './Type/index';

const styleTable = {
  width: '100%',
  display: 'table',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  borderBottom: '1px solid #e9ecef',
  fontFamily: 'Roboto, sans-serif',
};

const styleTableWrapper = {
  display: 'block',
  overflowX: 'auto',
};

const renderDisc = (
  name, selected, weight, handleRemoveDisc,
  id, handleSelectedStateChange, handleDiscColorChange,
) => (<Disc
  key={id}
  name={name}
  selected={selected}
  weight={weight}
  handleRemoveDisc={handleRemoveDisc}
  handleSelectedStateChange={handleSelectedStateChange}
  discID={id}
  handleDiscColorChange={handleDiscColorChange}
/>);

const BagContents = ({
  discs, handleRemoveDisc, handleSelectedStateChange, handleDiscColorChange,
}) => {
  const drivers = discs.filter(disc => disc.type === 'Distance Driver')
    .map(disc => renderDisc(`${disc.manufacturer} ${disc.name}`, true, disc.weight, handleRemoveDisc, disc.discID, handleSelectedStateChange, handleDiscColorChange));

  const fairwayDrivers = discs.filter(disc => disc.type === 'Fairway Driver')
    .map(disc => renderDisc(`${disc.manufacturer} ${disc.name}`, true, disc.weight, handleRemoveDisc, disc.discID, handleSelectedStateChange, handleDiscColorChange));

  const midranges = discs.filter(disc => disc.type === 'Mid-Range')
    .map(disc => renderDisc(`${disc.manufacturer} ${disc.name}`, true, disc.weight, handleRemoveDisc, disc.discID, handleSelectedStateChange, handleDiscColorChange));

  const putters = discs.filter(disc => disc.type === 'Putt & Approach')
    .map(disc => renderDisc(`${disc.manufacturer} ${disc.name}`, true, disc.weight, handleRemoveDisc, disc.discID, handleSelectedStateChange));

  return (
    <Div id="tableWrapper" css={styleTableWrapper}>
      <Table id="DiscTable" css={styleTable}>
        <Type name="Drivers">
          {drivers}
        </Type>
        <Type name="Fairway Drivers">
          {fairwayDrivers}
        </Type>
        <Type name="Midranges">
          {midranges}
        </Type>
        <Type name="Putters">
          {putters}
        </Type>
      </Table>
    </Div>

  );
};

BagContents.propTypes = {
  name: PropTypes.string.isRequired,
  discs: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRemoveDisc: PropTypes.func.isRequired,
  handleSelectedStateChange: PropTypes.func.isRequired,
  handleDiscColorChange: PropTypes.func.isRequired,
};

export default BagContents;
