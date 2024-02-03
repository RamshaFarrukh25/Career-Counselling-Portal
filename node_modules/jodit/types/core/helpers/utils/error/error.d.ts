/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
/**
 * Helper for create Error object
 */
export declare function error(message: string): Error;
export declare function connection(message: string): Error;
export declare function options(message: string): Error;
export declare function abort(message: string): Error;
export declare function isAbort(error: unknown): boolean;
