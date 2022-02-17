import React from 'react';
import { Card, CustomInput, Badge, Button } from 'reactstrap';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { useMutation } from 'react-query';
import { RIDER_APPROVAL } from 'queries';

const RiderDataListView = ({ rider, isSelect, collect, refetch }) => {
  const { mutate: driverApprove } = useMutation(RIDER_APPROVAL);
  const handleSubmit = async (id) => {
    await driverApprove(
      { driver_id: id },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={rider._id} collect={collect}>
        <Card
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="list-item-heading mb-1 w-10 w-sm-100 truncate">
                {rider.name}
              </p>
              <p className="list-item-heading mb-1 w-20 w-sm-100 truncate">
                {rider.availableForDelivery
                  ? 'Available for delivery'
                  : 'Not Available for delivery'}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                Phone Number: <br /> {rider.phone_number}
              </p>

              <div className="w-20 w-sm-100">
                {rider.status === 'ACTIVE' ? (
                  <Badge color={rider.statusColor} pill>
                    {rider.status}
                  </Badge>
                ) : (
                  <>
                    <Button color="primary">
                      <IntlMessages
                        id="Approve"
                        onClick={() => handleSubmit(rider._id)}
                      />
                    </Button>
                  </>
                )}
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
