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

const BagContents = ({
  baggedDiscs, handleDeleteDisc, handleUpdateDiscSelected, handleUpdateDiscColor,
}) => {
  const drivers = [];
  const fairwayDrivers = [];
  const midranges = [];
  const putters = [];

  baggedDiscs.forEach((disc) => {
    const discElement = (
      <Disc
        key={disc.id}
        name={`${disc.manufacturer} ${disc.name}`}
        selected={disc.selected}
        weight={disc.weight}
        handleDeleteDisc={handleDeleteDisc}
        handleUpdateDiscSelected={handleUpdateDiscSelected}
        discID={disc.id}
        handleUpdateDiscColor={handleUpdateDiscColor}
        discColor={disc.color}
      />
    );

    switch (disc.type) {
      case 'Distance Driver':
        drivers.push(discElement);
        break;
      case 'Fairway Driver':
        fairwayDrivers.push(discElement);
        break;
      case 'Mid-Range':
        midranges.push(discElement);
        break;
      case 'Putt & Approach':
        putters.push(discElement);
        break;
      default:
        drivers.push(discElement);
    }
  });

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
