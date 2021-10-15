import { Map as ImmutableMap } from 'immutable';
import React from 'react';

const defaultValue = new ImmutableMap();

export default React.createContext(defaultValue);
