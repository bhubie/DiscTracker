import React from 'react';
import PropTypes from 'prop-types';
import Disc from './Disc/index';
import Type from './Type/index';

const BagContents = ({
  baggedDiscs, handleDeleteDisc, handleUpdateDiscSelected,
  handleUpdateDiscColor, handleUpdateDiscWear,
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
        discWear={disc.wear}
        handleUpdateDiscWear={handleUpdateDiscWear}
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
    <div id="tableWrapper" className="styleTableWrapper">
      <table id="DiscTable" className="styleTable">
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
      </table>
    </div>

  );
};

BagContents.propTypes = {
  baggedDiscs: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDeleteDisc: PropTypes.func.isRequired,
  handleUpdateDiscSelected: PropTypes.func.isRequired,
  handleUpdateDiscColor: PropTypes.func.isRequired,
  handleUpdateDiscWear: PropTypes.func.isRequired,
};

export default BagContents;
