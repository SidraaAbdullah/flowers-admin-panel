import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import ContextMenuContainer from './ContextMenuContainer';
import DataListView from './RiderDataListView';

function collect(props) {
  return { data: props.data };
}

const RiderListPageListing = ({
  items,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
  refetchProducts,
}) => {
  return (
    <Row>
      {(items || []).map((rider) => {
        return (
          <DataListView
            key={rider.__id}
            rider={rider}
            isSelect={selectedItems.includes(rider._id)}
            onCheckItem={onCheckItem}
            collect={collect}
            refetch={refetchProducts}
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

export default React.memo(RiderListPageListing);
