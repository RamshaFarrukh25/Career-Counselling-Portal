/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2023 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
/**
 * @module helpers/array
 */
/**
 * Split separated elements
 */
export declare function splitArray(a: string): string[];
export declare function splitArray<T extends any[]>(a: T): T;
export declare function splitArray<T extends any[]>(a: T | string): T | string[];
