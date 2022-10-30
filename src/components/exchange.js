import { TextField, Typography, Button, ButtonGroup, CardContent, Card, MenuItem } from '@mui/material';

const FilterButton = ({ value = '', typeFilter = '', setTypeFilter = () => {}, children = null }) => {
  return (
    <Button sx={{ color: typeFilter === value && '#f77' }} onClick={() => { setTypeFilter(value); }}>
      {children}
    </Button>
  );
};

const Exchange = ({
  title = '',
  directions = [],
  autoFocus = false,
  typeFilter = 'all',
  direction = '',
  setTypeFilter = () => {},
  setDirection = () => {},
}) => {
  return (
    <Card sx={{ minWidth: 375 }}>
      <CardContent>
        <Typography variant="h5" component="div" color={'#f77'}>{title}</Typography>
        <div style={{ height: 20 }} />
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <FilterButton value="all"            typeFilter={typeFilter} setTypeFilter={setTypeFilter}>Всё</FilterButton>
          <FilterButton value="cryptocurrency" typeFilter={typeFilter} setTypeFilter={setTypeFilter}>Криптовалюты</FilterButton>
          <FilterButton value="cash"           typeFilter={typeFilter} setTypeFilter={setTypeFilter}>Наличные</FilterButton>
          <FilterButton value="bank"           typeFilter={typeFilter} setTypeFilter={setTypeFilter}>Банки</FilterButton>
        </ButtonGroup>
        <div style={{ height: 20 }} />
        <TextField label="Value for exchange" variant="outlined" size="small" autoFocus={autoFocus} />
        <TextField
          label="Currency"
          variant="outlined"
          select
          size="small"
          sx={{ minWidth: 120, mx: 1 }}
          value={direction}
          onChange={(evt) => { setDirection(evt.target.value); }}
        >
          {directions.map((item, index) => <MenuItem key={item.code} value={'' + index}>{item.name}</MenuItem>)}
        </TextField>
      </CardContent>
    </Card>
  );
};

export default Exchange;