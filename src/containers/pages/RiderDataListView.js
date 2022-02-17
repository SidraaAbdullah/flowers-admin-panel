import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const RiderDataListView = ({ rider, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={rider._id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, rider._id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="list-item-heading mb-1 w-15 w-sm-100 truncate">
                {rider.name}
              </p>
              <p className="list-item-heading mb-1 w-15 w-sm-100 truncate">
                {rider.availableForDelivery
                  ? 'Available for delivery'
                  : 'Not Available for delivery'}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                Phone Number: <br /> {rider.phone_number}
              </p>
              <div className="w-15 w-sm-100">
                <Badge color={rider.statusColor} pill>
                  {rider.status}
                </Badge>
              </div>
            </div>

            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${rider._id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(RiderDataListView);
