import { useNavigate } from 'react-router-dom';

export function useMoveBack() {
    const navigate = useNavigate();
    console.log("useMoveBack")
    console.log(navigate(-1));
    return () => navigate(-1);
}

export default useMoveBack;