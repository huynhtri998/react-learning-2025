import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLastOrderId } from './orderSlice';

function LastOrder() {
  const lastOrderId = useSelector(getLastOrderId);

  if (!lastOrderId) return null;

  return (
    <Link
      to={`/order/${lastOrderId}`}
      className="text-sm font-semibold text-stone-800 hover:text-yellow-800 transition-colors"
    >
      View Last Order #{lastOrderId}
    </Link>
  );
}

export default LastOrder;

