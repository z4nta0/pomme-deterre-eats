


// #region Imports

import type { PlaRecTyp } from '../../core/places.ts'; // What: Place Record Type. Why: The search reads and returns place records. How: This types its list and its result.

// #endregion Imports



/**
 * search.ts = Place Search
 *
 * @summary
 * The listing's search: narrows a list of places to those matching the
 * visitor's words, town, and kind. Words match anywhere in a place's name,
 * town, kinds, or description, ignoring case and accents, and every word
 * has to match somewhere, so each word added narrows the list.
 *
 * Sections:
 *  - Helpers
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Helpers

const norTexFun = ( rawTexStr : string ) => rawTexStr.normalize( 'NFD' ).replace( /\p{Diacritic}/gu, '' ).toLowerCase(); // What: Normalize Text Function. Why: "cafe" should find "Café", and "BBQ" should find "bbq". How: This splits accented letters from their marks, drops the marks, and lowercases what's left.



// #region seaPlaFun

/**
 * seaPlaFun = Search Places Function
 *
 * @summary
 * Returns the places matching all three of the listing's choices, in the
 * order the list gave them. An empty query, town, or kind matches every
 * place, so a visitor can use any one of them alone. The query splits on
 * spaces into words, and a place matches when each word appears in its
 * name, town, kinds, or description; the town and the kind have to match
 * exactly.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param plaRecArr - Place Record Array: The places to search,
 *                    {@link PLA_REC_ARR}.
 * @param queTexStr - Query Text String: The visitor's words, or an empty
 *                    string.
 * @param towNamStr - Town Name String: The town to keep, or an empty string
 *                    for every town.
 * @param tagNamStr - Tag Name String: The kind to keep, or an empty string for
 *                    every kind.
 *
 * @returns The matching places.
 * @see {@link matPlaArr}
 *
 * @example
 * ```ts
 * seaPlaFun(PLA_REC_ARR, 'pizza', 'Wheatland', '') // => the Wheatland pizza places
 * ```
 *
*/

function seaPlaFun ( plaRecArr : PlaRecTyp[], queTexStr : string, towNamStr : string, tagNamStr : string ) : PlaRecTyp[] {


	const queWorArr = norTexFun( queTexStr ).split( /\s+/ ).filter( ( queWorStr ) => queWorStr !== '' ); // What: Query Word Array. Why: Each word narrows the list on its own. How: This normalizes the query and splits it on runs of spaces, dropping empty pieces.


	const matPlaArr = plaRecArr.filter( ( plaRecObj ) => { // What: Matched Place Array. Why: Only the places that pass every choice stay. How: This keeps each place whose town, kind, and words all match.


		const hayTexStr = norTexFun( [ plaRecObj.namStr, plaRecObj.towStr, ...plaRecObj.tagArr, plaRecObj.desStr ].join( ' ' ) ); // What: Haystack Text String. Why: The words can match any of the place's text. How: This joins its name, town, kinds, and description, normalized like the query.
		const tagMatBoo = tagNamStr === '' || plaRecObj.tagArr.includes( tagNamStr );                                             // What: Tag Match Boolean. Why: A chosen kind keeps only the places of that kind. How: This passes every place when no kind is chosen, and otherwise checks the place's kinds.
		const towMatBoo = towNamStr === '' || plaRecObj.towStr === towNamStr;                                                     // What: Town Match Boolean. Why: A chosen town keeps only its places. How: This passes every place when no town is chosen, and otherwise compares the place's town.
		const worMatBoo = queWorArr.every( ( queWorStr ) => hayTexStr.includes( queWorStr ) );                                    // What: Word Match Boolean. Why: Every word has to appear somewhere in the place's text. How: This checks each word against the joined text, passing when there are no words.



		return towMatBoo && tagMatBoo && worMatBoo; // What: Match Return. Why: A place stays only when every choice matches. How: This combines the three checks.


	} );



	return matPlaArr; // What: Matched Places Return. Why: The listing shows these. How: This hands them back.


}

// #endregion seaPlaFun

// #endregion Helpers



// #region Exports

export { seaPlaFun }; // What: Named Export. Why: The listing narrows its cards with the search. How: This exports seaPlaFun.

// #endregion Exports


