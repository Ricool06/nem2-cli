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
import {expect} from 'chai';
import {DurationResolver} from '../../src/resolvers/duration.resolver';
import {HeightResolver} from '../../src/resolvers/height.resolver';

describe('Height resolver', () => {

    it('should return height', () => {
        const height = '10';
        const profileOptions = {height} as any;
        expect(new HeightResolver().resolve(profileOptions).compact())
            .to.be.equal(10);
    });

    it('should throw error if height invalid', () => {
        const height = '-1';
        const profileOptions = {height} as any;
        expect(() => new HeightResolver().resolve(profileOptions))
            .to.throws(Error);
    });
});
