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
  name, selected, weight, handleDeleteDisc,
  id, handleUpdateDiscSelected, handleUpdateDiscColor, discColor,
) => (<Disc
  key={id}
  name={name}
  selected={selected}
  weight={weight}
  handleDeleteDisc={handleDeleteDisc}
  handleUpdateDiscSelected={handleUpdateDiscSelected}
  discID={id}
  handleUpdateDiscColor={handleUpdateDiscColor}
  discColor={discColor}
/>);

const BagContents = ({
  baggedDiscs, handleDeleteDisc, handleUpdateDiscSelected, handleUpdateDiscColor,
}) => {
  const drivers = baggedDiscs.filter(disc => disc.type === 'Distance Driver')
    .map(disc => renderDisc(`${disc.manufacturer} ${disc.name}`, disc.selected, disc.weight, handleDeleteDisc, disc.id, handleUpdateDiscSelected, handleUpdateDiscColor, disc.color));

  const fairwayDrivers = baggedDiscs.filter(disc => disc.type === 'Fairway Driver')
    .map(disc => renderDisc(`${disc.manufacturer} ${disc.name}`, disc.selected, disc.weight, handleDeleteDisc, disc.id, handleUpdateDiscSelected, handleUpdateDiscColor, disc.color));

  const midranges = baggedDiscs.filter(disc => disc.type === 'Mid-Range')
    .map(disc => renderDisc(`${disc.manufacturer} ${disc.name}`, disc.selected, disc.weight, handleDeleteDisc, disc.id, handleUpdateDiscSelected, handleUpdateDiscColor, disc.color));

  const putters = baggedDiscs.filter(disc => disc.type === 'Putt & Approach')
    .map(disc => renderDisc(`${disc.manufacturer} ${disc.name}`, disc.selected, disc.weight, handleDeleteDisc, disc.id, handleUpdateDiscSelected, handleUpdateDiscColor, disc.color));

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
  baggedDiscs: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDeleteDisc: PropTypes.func.isRequired,
  handleUpdateDiscSelected: PropTypes.func.isRequired,
  handleUpdateDiscColor: PropTypes.func.isRequired,
};

export default BagContents;
