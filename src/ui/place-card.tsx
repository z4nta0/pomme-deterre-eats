


// #region Imports

import cssModObj from './place-card.module.css'; // What: CSS Module Object. Why: The card is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.


import { Link      } from 'react-router';  // What: Link. Why: The card's owner link moves to the Contact page without a full page load. How: This renders it as a router link.
import { MapPinCom } from './map-pin.tsx'; // What: Map Pin Component. Why: The card's town is marked with a pin, as on a map. How: This draws the small pin before it.


import type { PlaRecTyp } from '../core/places.ts'; // What: Place Record Type. Why: The card shows one place's record. How: This types the card's one prop.

// #endregion Imports



/**
 * place-card.tsx = Place Card
 *
 * @summary
 * The card that shows one place to eat, on the home page's picks and in the
 * listing: its town and kinds, its name, a sentence about it, a note when it
 * opens only in the warm months, its address, and the ways to reach it (its
 * phone, directions, and its own site or page), with a quiet link for its
 * owner to send changes. A detail the place's record doesn't have is left
 * off the card rather than shown empty.
 *
 * Sections:
 *  - Helpers
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Helpers

const mapHreFun = ( addTexStr : string ) => `https://www.google.com/maps/search/?api=1&query=${ encodeURIComponent( addTexStr ) }`; // What: Map Hypertext-Reference Function. Why: Directions should open in the visitor's maps. How: This builds a Google Maps search address for the street address.
const telHreFun = ( phoNumStr : string ) => `tel:+1${ phoNumStr.replace( /\D/g, '' ) }`;                                            // What: Telephone Hypertext-Reference Function. Why: A tap on the number should place the call. How: This strips the dashes and adds the country code to build a tel: address.
const webLabFun = ( webUrlStr : string ) => webUrlStr.includes( 'facebook.com' ) ? 'Facebook page' : 'Website';                     // What: Website Label Function. Why: Many places have only a Facebook page, and the link should say where it goes. How: This names a facebook.com address as a Facebook page and anything else as a website.

// #endregion Helpers



// #region Components

type PccProTyp = { heaLevNum : 2 | 3, plaRecObj : PlaRecTyp }; // What: Place-Card-Component Props Type. Why: A card shows one place, its name a heading at whatever level follows the page's own headings. How: This types the heading level and the place's record.

// #region PlaCarCom

/**
 * PlaCarCom = Place Card Component
 *
 * @summary
 * Renders one place's card from its record. The ways to reach it show only
 * the details the record has: a call link when it has a phone number, a
 * directions link when it has an address, and a link to its own site or
 * page when it has one, those two opening in a new tab that can't reach
 * back to this one, each saying so to screen readers along with the place's
 * name, so every link reads apart from the other cards' links. The owner
 * link opens the Contact page with updating a listing chosen and the
 * place's name filled in.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props.heaLevNum - Heading Level Number: 2 where the card sits right
 *                          under the page's h1, 3 where a section's h2 leads
 *                          it.
 * @param props.plaRecObj - Place Record Object: The place to show, one row of
 *                          {@link PLA_REC_ARR}.
 *
 * @returns The card's article element.
 *
 * @example
 * ```tsx
 * PlaCarCom({ heaLevNum: 3, plaRecObj }) // => <PlaCarCom />
 * ```
 *
*/

function PlaCarCom ( { heaLevNum, plaRecObj } : PccProTyp ) : React.JSX.Element {


	const CarNamTag = heaLevNum === 2 ? 'h2' : 'h3'; // What: Card Name Tag. Why: The card's name has to follow the page's own heading order. How: This picks the h2 or h3 tag the name renders as.



	return (


		<article className={ cssModObj.plaCarArt }>{ /* What: Place Card Article Element. Why: Each place reads as a card of its own. How: This stacks the card's parts on a white panel that lifts on hover. */ }


			<p className={ cssModObj.carMetPar }>{ /* What: Card Meta Paragraph Element. Why: A visitor scans first for where a place is and what it serves. How: This sets the pin, the town, and the kinds in one line above the name. */ }


				<MapPinCom sizStr='small' />{ /* What: Map Pin Component. Why: The town is marked with a pin, as on a map. How: This draws the small pin with its coral dot. */ }



				<span>{ [ plaRecObj.towStr, ...plaRecObj.tagArr ].join( ' · ' ) }</span>{ /* What: Card Meta Span Element. Why: The town and the kinds read as one line. How: This joins the town and the place's tags with middle dots. */ }


			</p>



			<CarNamTag className={ cssModObj.carNamHea }>{ plaRecObj.namStr }</CarNamTag>{ /* What: Card Name Heading Element. Why: The place's name is what the card is about. How: This shows it as the card's heading, at the level its props name. */ }

			<p className={ cssModObj.carDesPar }>{ plaRecObj.desStr }</p>{ /* What: Card Description Paragraph Element. Why: A sentence says what the place is like. How: This shows the record's description. */ }

			{ plaRecObj.seaBoo && <p className={ cssModObj.carSeaPar }>Open in the warm months</p> }{ /* What: Card Seasonal Paragraph Element. Why: A visitor shouldn't drive out to a place closed for the season. How: This shows a small note only when the record says the place is seasonal. */ }

			{ plaRecObj.addStr && <p className={ cssModObj.carAddPar }>{ plaRecObj.addStr }</p> }{ /* What: Card Address Paragraph Element. Why: A visitor needs to know where the place is. How: This shows the street address only when the record has one. */ }


			<ul className={ cssModObj.carActUno }>{ /* What: Card Actions Unordered Element. Why: The ways to reach a place are a short list of links. How: This sets them in a row that wraps, showing only the ones the record has details for. */ }


				{ plaRecObj.phoStr && ( // What: Phone Item Check. Why: Only a place with a phone number can be called. How: This renders the call link when the record has a number.


					<li>{ /* What: Card Phone Item Element. Why: The call link is one item of the list. How: This holds it. */ }


						<a
							className={ cssModObj.carActAnc }

							href={ telHreFun( plaRecObj.phoStr ) }

							aria-label={ `Call ${ plaRecObj.namStr } at ${ plaRecObj.phoStr }` } // What: Call Label. Why: The visible number alone doesn't say which place it calls. How: This names the place and the number for screen readers.
						>{ plaRecObj.phoStr }</a>{ /* What: Card Action Anchor Element. Why: A tap on the number should call the place. How: This links the number to a tel: address. */ }


					</li>


				) }


				{ plaRecObj.addStr && ( // What: Directions Item Check. Why: Only a place with an address can be mapped. How: This renders the directions link when the record has an address.


					<li>{ /* What: Card Directions Item Element. Why: The directions link is one item of the list. How: This holds it. */ }


						<a
							className={ cssModObj.carActAnc }

							href={ mapHreFun( plaRecObj.addStr ) }
							rel='noopener noreferrer'
							target='_blank'
						>Directions<span className={ cssModObj.visHidSpa }> to { plaRecObj.namStr } (opens in a new tab)</span></a>{ /* What: Card Action Anchor Element. Why: A visitor should get from the card to the road. How: This opens the address in Google Maps in a new tab, its hidden note naming the place and the new tab for screen readers. */ }


					</li>


				) }


				{ plaRecObj.webStr && ( // What: Website Item Check. Why: Only a place with a site or page can link to it. How: This renders the link when the record has an address for one.


					<li>{ /* What: Card Website Item Element. Why: The website link is one item of the list. How: This holds it. */ }


						<a
							className={ cssModObj.carActAnc }

							href={ plaRecObj.webStr }
							rel='noopener noreferrer'
							target='_blank'
						>{ webLabFun( plaRecObj.webStr ) }<span className={ cssModObj.visHidSpa }> for { plaRecObj.namStr } (opens in a new tab)</span></a>{ /* What: Card Action Anchor Element. Why: A place's own site or page has its latest news. How: This opens it in a new tab, labelled a website or a Facebook page, its hidden note naming the place and the new tab for screen readers. */ }


					</li>


				) }


			</ul>



			<Link
				className={ cssModObj.carOwnAnc }

				to={ `/contact?reason=update&place=${ encodeURIComponent( plaRecObj.namStr ) }` } // What: Owner Update Address. Why: An owner who spots a mistake should land on a form that already knows the place. How: This names the update reason and the place's name in the query, which the Contact page reads.
			>Own this place? Update its listing<span className={ cssModObj.visHidSpa }>: { plaRecObj.namStr }</span></Link>{ /* What: Card Owner Anchor Link. Why: Owners are the guide's other audience, and each card is where they'd notice a change to make. How: This routes to the Contact page with the update chosen, its hidden note naming the place so every card's link reads apart. */ }


		</article>


	);


}

// #endregion PlaCarCom

// #endregion Components



// #region Exports

export { PlaCarCom }; // What: Named Export. Why: The home page's picks and the listing show places as cards. How: This exports PlaCarCom.

// #endregion Exports


