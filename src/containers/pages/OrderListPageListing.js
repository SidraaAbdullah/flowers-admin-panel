import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import ContextMenuContainer from './ContextMenuContainer';
import DataListView from './OrderDataListView';

function collect(props) {
  return { data: props.data };
}

const OrderListPageListing = ({
  items,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  return (
    <Row>
      {(items || []).map((product) => {
        return (
          <DataListView
            key={product.__id}
            product={product}
            isSelect={selectedItems.includes(product._id)}
            onCheckItem={onCheckItem}
            collect={collect}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(OrderListPageListing);
