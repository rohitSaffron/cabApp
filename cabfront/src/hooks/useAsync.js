import { useReducer} from 'react'

export default function useAsync(){
    const [state, dispatch] = useReducer((state, newState) => ({ ...state, ...newState}), { data: null, error: null, status: 'idle' })
    const setData = (data) => dispatch({ ...state, data, status: 'resolved' });
    const setStatus = (status) => dispatch({ ...state, status});
    const setError = error => dispatch({ ...state, error, status: 'rejected' });
     return { ...state, setData, setError, setStatus};
}