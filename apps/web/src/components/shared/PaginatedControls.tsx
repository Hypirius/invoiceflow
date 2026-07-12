import { useState } from "react";
import Button from "../ui/Button";

//TODO: incomplete, needs overhaul

type PageControlButtonProps = {
  pageNumber: number;
  handlePageClick: () => void;
};

type PagesProps = {
  pageSize: number;
  handlePageClick: (pageNumber: number) => void;
};

type PaginatedControlsProps = {
  totalItemsSize: number;
  handlePageData: (pageNumber: number) => void;
};

function PageControlButton({
  pageNumber,
  handlePageClick,
}: PageControlButtonProps) {
  return (
    <Button variant="outlined" onClick={handlePageClick}>
      {pageNumber}
    </Button>
  );
}

function Pages({ pageSize, handlePageClick }: PagesProps) {
  return Array.from({ length: pageSize }, (_, index) => {
    const pageNumber = index + 1;
    return (
      <PageControlButton
        key={pageNumber} // change this later on
        pageNumber={pageNumber}
        handlePageClick={() => handlePageClick(pageNumber)}
      />
    );
  });
}

function PaginatedControls({
  totalItemsSize,
  handlePageData,
}: PaginatedControlsProps) {
  const [selectedPage, setSelectedPage] = useState(1);
  const pageSize = Math.ceil(totalItemsSize / 10);

  function handlePageClick(pageNumber: number) {
    if (selectedPage !== pageNumber) {
      handlePageData(pageNumber);
      setSelectedPage(pageNumber);
    }
  }

  return (
    <div id="paginated-controls" className="*:w-20 *:h-20">
      <Button variant="outlined">&lt;</Button>
      <Pages pageSize={pageSize} handlePageClick={handlePageClick} />
      <Button variant="outlined">&gt;</Button>
    </div>
  );
}

export default PaginatedControls;
