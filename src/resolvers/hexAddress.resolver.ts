import {Profile} from '../model/profile';
import {OptionsResolver} from '../options-resolver';
import {ProfileOptions} from '../profile.command';
import {HexAddressValidator} from '../validators/hexAddress.validator';
import {Resolver} from './resolver';

/**
 * Hex Address resolver
 */
export class HexAddressResolver implements Resolver {

    /**
     * Resolves an address provided by the user.
     * @param {ProfileOptions} options - Command options.
     * @param {Profile} secondSource - Secondary data source.
     * @param {string} altText - Alternative text.
     * @returns {Address}
     */
    resolve(options: ProfileOptions, secondSource?: Profile, altText?: string): any {
        const resolution = OptionsResolver(options,
            'address',
            () => secondSource ? secondSource.address.pretty() : undefined,
            altText ? altText : 'Enter an hex address: ').trim();
        new HexAddressValidator().validate(resolution);
        return resolution;
    }
}