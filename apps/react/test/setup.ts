import 'vitest-dom/extend-expect';

import { vi } from 'vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

vi.mock('react-oidc-context');
vi.mock('../src/lib/config');

afterEach(cleanup);
