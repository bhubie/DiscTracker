import React from 'react';
import PropTypes from 'prop-types';
import Disc from './Disc/index';
import Type from './Type/index';

const BagContents = ({
  baggedDiscs, handleDeleteDisc, handleUpdateDiscSelected,
  handleUpdateDiscColor, handleUpdateDiscWear, columns,
}) => {
  const drivers = [];
  const fairwayDrivers = [];
  const midranges = [];
  const putters = [];

  baggedDiscs
    .sort((a, b) => a.name > b.name)
    .forEach((disc) => {
      const discElement = (
        <Disc
          key={disc.id}
          name={disc.discWithManufacturer}
          selected={disc.selected}
          weight={disc.weight}
          handleDeleteDisc={handleDeleteDisc}
          handleUpdateDiscSelected={handleUpdateDiscSelected}
          discID={disc.id}
          handleUpdateDiscColor={handleUpdateDiscColor}
          discColor={disc.color}
          discWear={disc.wear}
          handleUpdateDiscWear={handleUpdateDiscWear}
          displayedFields={columns}
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
    <div id="tableWrapper">
      <Type name="Drivers" columns={columns}>
        {drivers}
      </Type>
      <Type name="Fairway Drivers" columns={columns}>
        {fairwayDrivers}
      </Type>
      <Type name="Midranges" columns={columns}>
        {midranges}
      </Type>
      <Type name="Putters" columns={columns}>
        {putters}
      </Type>
    </div>
  );
};

BagContents.propTypes = {
  baggedDiscs: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDeleteDisc: PropTypes.func.isRequired,
  handleUpdateDiscSelected: PropTypes.func.isRequired,
  handleUpdateDiscColor: PropTypes.func.isRequired,
  handleUpdateDiscWear: PropTypes.func.isRequired,
};

export default BagContents;
