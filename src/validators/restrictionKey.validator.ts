/*
 *
 * Copyright 2018-present NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { ExpectedError, ValidationContext, Validator } from 'clime';
import { KeyGenerator, UInt64 } from 'nem2-sdk';

/**
 * Validator of mosaic restriction key
 */
export class MosaicRestrictionKeyValidator implements Validator<string> {
    /**
     * Validates if a mosaic restriction key is valid.
     * @param {string} value - Mosaic restriction key.
     * @param {ValidationContext} context
     * @throws {ExpectedError}
     */
    validate(value: string, context?: ValidationContext): void {
        try {
            UInt64.fromNumericString(value);
        } catch (err) {
            throw new ExpectedError('Restriction key is an invalid UInt64 string');
        }
    }
}
