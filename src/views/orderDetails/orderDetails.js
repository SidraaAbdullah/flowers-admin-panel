import React from 'react';
// import { CREATE_PRODUCT } from 'queries/product';
// import { Card, CustomInput, Badge } from 'reactstrap';
// import { NavLink } from 'react-router-dom';
// import classnames from 'classnames';
// import { ContextMenuTrigger } from 'react-contextmenu';
// import { Colxx } from 'components/common/CustomBootstrap';
import { useQuery } from 'react-query';
import { ORDER } from 'queries';

const DataList = React.lazy(() =>
  import(
    /* webpackChunkName: "product-data-list" */ '../app/pages/product/data-list'
  )
);
const OrderDetail = ({ props }) => {
  const { data: order } = useQuery('ORDER', ORDER);
  console.log(order);
  return (
    <div>
      <DataList pathname="order" {...props} />;
      <div>
        {/* <Colxx xxs="12" className="mb-3">
          <ContextMenuTrigger id="menu_id" data={product._id} collect={collect}>
            <Card
              onClick={(event) => onCheckItem(event, product._id)}
              className={classnames('d-flex flex-row', {
                active: isSelect,
              })}
            >
              <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
                    <p className="list-item-heading mb-1 truncate">
                      {product.name}
                    </p>
                  </NavLink>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    {product.category_id?.name}
                  </p>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    {product.createdAt}
                  </p>
                  <div className="w-15 w-sm-100">
                    <Badge color={product.statusColor} pill>
                      {product.status}
                    </Badge>
                  </div>
                </div>
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <CustomInput
                    className="item-check mb-0"
                    type="checkbox"
                    id={`check_${product._id}`}
                    checked={isSelect}
                    onChange={() => {}}
                    label=""
                  />
                </div>
              </div>
            </Card>
          </ContextMenuTrigger>
        </Colxx> */}
      </div>
    </div>
  );
};

export default OrderDetail;
