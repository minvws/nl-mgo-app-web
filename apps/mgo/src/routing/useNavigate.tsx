import { type NavigateOptions, useNavigate as routerUseNavigate } from 'react-router-dom';
import { type To } from './routes';

export interface NavigateFunction {
    (to: To, options?: NavigateOptions): void;
    (delta: number): void;
}

export const useNavigate = routerUseNavigate as () => NavigateFunction;
