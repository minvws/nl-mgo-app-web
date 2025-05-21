import { useParams as routerUseParams } from 'react-router-dom';
import { type RouteParams } from './routes';

export const useParams = routerUseParams as () => Partial<RouteParams>;
