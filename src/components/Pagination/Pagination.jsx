import { Typography, Button } from '@mui/material';

function Pagination({ currentPage, setPage, totalPages }) {

  const handlePrev = () => {
    if (currentPage !== 1) { setPage((prevPage) => prevPage - 1); }
  };
  const handleNext = () => {
    if (currentPage !== totalPages) { setPage((prevPage) => prevPage + 1); }
  };

  if (totalPages === 0) return null;

  return (
    <div className="flex justify-between items-center">
      <Button onClick={handlePrev} variant="contained" className="mt-7 mx-0.5" color="primary" type="button">Prev</Button>
      <Typography variant="h4" className="my-0 mx-5 dark:!text-white" >{currentPage}</Typography>
      <Button onClick={handleNext} variant="contained" className="mt-7 mx-0.5" color="primary" type="button">Next</Button>
    </div>
  );
}

export default Pagination;
