import { PayloadAction } from "@reduxjs/toolkit";

export type ActionUidPayload = PayloadAction<string>;
export type ActionErrorPayload = PayloadAction<unknown>;
