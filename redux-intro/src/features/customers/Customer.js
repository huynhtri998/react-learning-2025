import { useSelector } from "react-redux";

function Customer() {
  // useSelector creates a subscription to the Redux store
  // When store changes, this component will re-render
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
