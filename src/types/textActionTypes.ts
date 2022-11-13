import { PayloadAction } from '@reduxjs/toolkit';
import { text } from './textTypes';

export type ActionIdPayload = PayloadAction<string>;
export type ActionUidPayload = PayloadAction<string>;
export type ActionIdContentPayload = PayloadAction<{
  id: string;
  content: string;
}>;
export type ActionTextPayload = PayloadAction<text>;
export type ActionErrorPayload = PayloadAction<unknown>;
