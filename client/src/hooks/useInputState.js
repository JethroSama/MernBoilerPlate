import { useState } from 'react';
export default (initialVal) => {
  const [st, setSt] = useState(initialVal);
  const handleChange = (evt) => {
    setSt(evt.target.value);
  };
  const reset = () => {
    setSt('');
  };
  return [st, handleChange, reset];
};
