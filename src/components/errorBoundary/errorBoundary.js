import { useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
const  ErrorBoundary = (props) => {
  const [error, setError] = useState(false);
//   static getDerivedStateFromError(error) {
//     return { error: true };
//   }
try {
  if (error) {
    return <ErrorMessage />;
  }
  return props.children;
} catch(err) {
  setError(true);
}
  // componentDidCatch(error, errorInfo) {
  //   console.log(error, errorInfo);
  //   this.setState({
  //     error: true,
  //   });
  // }
  
  //   if (this.state.error) {
  //     return <ErrorMessage />;
  //   }
  //   return this.props.children;
  
}

export default ErrorBoundary;
