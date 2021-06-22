import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ChartContext } from '../../contexts/ChartContext';
import './style.css';

function Control(props) {
  const [state, setState] = useContext(ChartContext); //eslint-disable-line

  const { handleSubmit, register } = useForm();
  // debugger;//eslint-disable-line

  const onSubmit = (data) => { 
    setState({...state});
    console.log(state); 
  };

  return (
    <div className='control'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="startDate">Start Date</label>
          <input name='startDate' type="date" {...register('startDate')} />
        </div>
        <div className="form-control">
          <label htmlFor="endDate">End Date</label>
          <input type="date" name='endDate' {...register('endDate')} />
        </div>
        <div className="formControl">
          <button type='submit'>Update</button>
        </div>
      </form>
    </div>
  );
}

export default Control;
