


// #region Imports

import cssModObj from './places.module.css'; // What: CSS Module Object. Why: The listing is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.


import { Link            } from 'react-router';                 // What: Link. Why: The note under the heading moves to the Contact page without a full page load. How: This renders it as a router link.
import { PLA_REC_ARR     } from '../../core/places.ts';         // What: Place Record Array. Why: The listing shows the guide's places. How: This is the table it searches.
import { PlaCarCom       } from '../../ui/place-card.tsx';      // What: Place Card Component. Why: Each place shows as a card. How: This renders one card per match.
import { seaPlaFun       } from './search.ts';                  // What: Search Places Function. Why: The listing narrows to the visitor's choices. How: This returns the matching places.
import { TAG_NAM_ARR     } from '../../core/places.ts';         // What: Tag Name Array. Why: The kind filter offers every kind some place carries. How: This lists its options.
import { TOW_NAM_ARR     } from '../../core/places.ts';         // What: Town Name Array. Why: The town filter offers every town some place is in. How: This lists its options.
import { usePagDesFun    } from '../../ui/page-description.ts'; // What: Use Page Description Function. Why: The listing has its own search description. How: This swaps index.html's description tag while the page shows.
import { useRef          } from 'react';                        // What: Use Ref. Why: Clearing the filters moves focus back to the search box. How: This attaches a reference to the box.
import { useSearchParams } from 'react-router';                 // What: Use Search Params. Why: The visitor's choices live in the address, so a search can be shared, bookmarked, or opened from the home page. How: This reads and writes the query string.

// #endregion Imports



/**
 * places.tsx = Places Page
 *
 * @summary
 * The listing: every place to eat in the guide, as cards under a heading,
 * with a panel that narrows them by the visitor's words, a town, and a kind
 * of food. The choices live in the page's address (q, town, and kind), so the
 * home page's search opens it already searched, and a search can be shared.
 * A line under the panel counts the matches, and tells screen reader users
 * as it changes; when nothing matches, a note says so and offers to clear
 * the choices. The cards sit two across above 640px wide, an odd last card
 * centered below the others, and one across at 640px and below.
 *
 * Sections:
 *  - Constants
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const PLA_DES_STR = 'Search every place to eat around Lake Pomme de Terre by name, town, or kind of food, from Hermitage diners to marina grills.'; // What: Places Description String. Why: The listing has its own search description. How: usePagDesFun shows it while the page is open.

// #endregion Constants



// #region Components

// #region PlaPagCom

/**
 * PlaPagCom = Places Page Component
 *
 * @summary
 * Renders the listing. Each change to the search box or a filter replaces
 * the address's query rather than adding a history entry, so the back button
 * leaves the page rather than stepping through every letter typed, and drops
 * a choice that's been emptied. The cards are the matches seaPlaFun returns,
 * in the table's alphabetical order. The clear button empties every choice
 * and puts focus back in the search box, so focus never falls to the page
 * when the button disables itself.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's wrapper div.
 *
 * @example
 * ```tsx
 * PlaPagCom() // => <PlaPagCom />
 * ```
 *
*/

function PlaPagCom () : React.JSX.Element {


	usePagDesFun( PLA_DES_STR ); // What: Page Description Call. Why: The listing has its own search description. How: This shows it while the page is open.



	const [ seaParObj, setSeaParObj ] = useSearchParams(); // What: Search Parameters Object And Setter. Why: The visitor's choices live in the address. How: This reads the query string and replaces it.

	const queTexStr = seaParObj.get( 'q' ) ?? '';                                // What: Query Text String. Why: The search box shows and searches the visitor's words. How: This reads q from the address, or nothing.
	const tagNamStr = seaParObj.get( 'kind' ) ?? '';                             // What: Tag Name String. Why: The kind filter shows and keeps its choice. How: This reads kind from the address, or nothing.
	const towNamStr = seaParObj.get( 'town' ) ?? '';                             // What: Town Name String. Why: The town filter shows and keeps its choice. How: This reads town from the address, or nothing.
	const anyChoBoo = queTexStr !== '' || towNamStr !== '' || tagNamStr !== '';  // What: Any Choice Boolean. Why: The clear button only means something once a choice is made. How: This checks whether any of the three holds a value.
	const matPlaArr = seaPlaFun( PLA_REC_ARR, queTexStr, towNamStr, tagNamStr ); // What: Matched Place Array. Why: The cards are the places matching every choice. How: This searches the table with the three choices.

	const seaInpRef = useRef< HTMLInputElement >( null ); // What: Search Input Reference. Why: Clearing the filters puts focus back in the search box. How: This attaches to the box.



	const setChoFun = ( keyNamStr : string, valTexStr : string ) => { // What: Set Choice Function. Why: Each control writes its own choice into the address. How: This sets the named key to the value, or drops it when the value is empty, replacing the current history entry.


		const nexParObj = new URLSearchParams( seaParObj ); // What: Next Parameters Object. Why: The other choices have to stay as they are. How: This copies the current query.


		if ( valTexStr === '' ) nexParObj.delete( keyNamStr ); // What: Empty Choice Branch. Why: An emptied choice shouldn't linger in the address. How: This drops the key.

		else nexParObj.set( keyNamStr, valTexStr ); // What: Set Choice Branch. Why: A made choice belongs in the address. How: This sets the key to the value.



		setSeaParObj( nexParObj, { replace : true } ); // What: Query Replace Call. Why: A choice shouldn't add a history entry for every letter typed. How: This writes the new query in place of the current one.


	};



	const cleChoFun = () => { // What: Clear Choices Function. Why: A visitor with no matches, or a narrow list, should get back to every place in one press. How: This empties the query and moves focus to the search box.


		setSeaParObj( new URLSearchParams(), { replace : true } ); // What: Query Clear Call. Why: Every choice goes at once. How: This replaces the query with an empty one.

		seaInpRef.current?.focus(); // What: Search Focus Call. Why: The clear button disables itself, and focus mustn't fall to the page. How: This moves focus into the search box, ready for a new search.


	};



	return (


		<div className={ cssModObj.plaPagDiv }>{ /* What: Places Page Div Element. Why: The page arrives gently and holds its heading, its panel, and its cards in order. How: This fades the page in and stacks them in the page's centered column. */ }


			<title>Places to Eat Around Lake Pomme de Terre</title>{ /* What: Page Title Element. Why: The listing's tab and search result need their own title. How: React places this ahead of index.html's title while the page shows. */ }

			<link
				href='https://pommedeterreeats.com/places'
				rel='canonical'
			/>{ /* What: Page Canonical Link Element. Why: Search engines should index the listing at one address, whatever its query. How: React places this in the head while the page shows. */ }


			<div className={ cssModObj.plaHeaDiv }>{ /* What: Places Heading Div Element. Why: The page opens by naming itself and inviting additions. How: This stacks the heading, the lead, and the note. */ }


				<h1 className={ cssModObj.plaTitHea }>Every place to eat around the lake</h1>{ /* What: Places Title Heading Element. Why: The page's one heading names the listing. How: This shows it large in navy. */ }

				<p className={ cssModObj.plaLeaPar }>Diners, marina grills, pizza, barbecue, and sweets, from Hermitage to Pittsburg to Wheatland and the towns around them. Search by name or food, or narrow the list by town or kind.</p>{ /* What: Places Lead Paragraph Element. Why: A sentence says what the listing holds and how to use it. How: This shows it a step larger than body text, in slate. */ }

				<p className={ cssModObj.plaNotPar }>Know a place I missed? <Link className={ cssModObj.plaNotAnc } to='/contact?reason=add'>Tell me about it</Link>.</p>{ /* What: Places Note Paragraph Element. Why: Visitors and owners alike can help the guide grow. How: This links to the Contact page with adding a place chosen. */ }


			</div>



			<form
				className={ cssModObj.filPanFor }

				role='search'

				onSubmit={ ( subEveObj ) => subEveObj.preventDefault() } // What: Submit Prevent Handler. Why: The list narrows as the visitor types, so pressing Enter in the box shouldn't reload the page. How: This cancels the browser's own submit.
			>{ /* What: Filter Panel Form Element. Why: The search and the filters read as one panel. How: This sets the search box and the two filters in a row with the clear button above 960px wide, the box on its own row from 960px down to 641px, and every control stacked at 640px and below, marked as a search landmark. */ }


				<div className={ cssModObj.filFieDiv }>{ /* What: Filter Field Div Element. Why: Each control's label sits above it. How: This stacks the search box's label above the box. */ }


					<label
						className={ cssModObj.filLabLab }

						htmlFor='plaSeaInp'
					>Search</label>{ /* What: Filter Label Label Element. Why: The box needs a visible name. How: This labels the search box. */ }

					<input
						id='plaSeaInp'
						ref={ seaInpRef }

						className={ cssModObj.filConInp }

						placeholder='Name, town, or food'
						type='search'
						value={ queTexStr }

						onChange={ ( chaEveObj ) => setChoFun( 'q', chaEveObj.target.value ) }
					/>{ /* What: Filter Control Input Element. Why: The visitor types what they're looking for. How: This shows the address's words and writes each change back as q. */ }


				</div>



				<div className={ cssModObj.filFieDiv }>{ /* What: Filter Field Div Element. Why: Each control's label sits above it. How: This stacks the town filter's label above its select. */ }


					<label
						className={ cssModObj.filLabLab }

						htmlFor='plaTowSel'
					>Town</label>{ /* What: Filter Label Label Element. Why: The select needs a visible name. How: This labels the town filter. */ }


					<select
						id='plaTowSel'

						className={ cssModObj.filConSel }

						value={ towNamStr }

						onChange={ ( chaEveObj ) => setChoFun( 'town', chaEveObj.target.value ) }
					>{ /* What: Filter Control Select Element. Why: A visitor staying in one town looks for places near it. How: This offers every town, showing the address's choice and writing each change back as town. */ }


						<option value=''>Every town</option>{ /* What: Every Town Option Element. Why: The filter starts open to every town. How: Its empty value drops the town from the address. */ }

						{ TOW_NAM_ARR.map( ( towOptStr ) => <option key={ towOptStr }>{ towOptStr }</option> ) }{ /* What: Town Option Map. Why: Each town gets an option. How: This renders one option per town, its text its value. */ }


					</select>


				</div>



				<div className={ cssModObj.filFieDiv }>{ /* What: Filter Field Div Element. Why: Each control's label sits above it. How: This stacks the kind filter's label above its select. */ }


					<label
						className={ cssModObj.filLabLab }

						htmlFor='plaTagSel'
					>Kind of food or place</label>{ /* What: Filter Label Label Element. Why: The select needs a visible name. How: This labels the kind filter. */ }


					<select
						id='plaTagSel'

						className={ cssModObj.filConSel }

						value={ tagNamStr }

						onChange={ ( chaEveObj ) => setChoFun( 'kind', chaEveObj.target.value ) }
					>{ /* What: Filter Control Select Element. Why: A visitor may be hungry for one thing. How: This offers every kind, showing the address's choice and writing each change back as kind. */ }


						<option value=''>Every kind</option>{ /* What: Every Kind Option Element. Why: The filter starts open to every kind. How: Its empty value drops the kind from the address. */ }

						{ TAG_NAM_ARR.map( ( tagOptStr ) => <option key={ tagOptStr }>{ tagOptStr }</option> ) }{ /* What: Kind Option Map. Why: Each kind gets an option. How: This renders one option per kind, its text its value. */ }


					</select>


				</div>



				<button
					className={ cssModObj.filCleBut }

					disabled={ !anyChoBoo }
					type='button'

					onClick={ cleChoFun }
				>Clear</button>{ /* What: Filter Clear Button Element. Why: A visitor should get back to every place in one press. How: This empties every choice, disabled while none is made. */ }


			</form>



			<p
				className={ cssModObj.resCouPar }

				role='status'
			>{ anyChoBoo ? `Showing ${ matPlaArr.length } of ${ PLA_REC_ARR.length } places` : `Showing all ${ PLA_REC_ARR.length } places` }</p>{ /* What: Results Count Paragraph Element. Why: The visitor should know how many places match, and screen reader users should hear it change. How: This counts the matches against the whole guide as a status region, which announces each new count. */ }



			{ matPlaArr.length > 0 ? ( // What: Results Choice. Why: The cards show when something matches, and a note when nothing does. How: This renders the grid for one match or more, and the empty note otherwise.


				<div className={ cssModObj.resGriDiv }>{ /* What: Results Grid Div Element. Why: The matches read as a grid of cards. How: This sets them two across above 640px wide, an odd last card centered below the others, and one across at 640px and below. */ }


					{ matPlaArr.map( ( plaRecObj ) => ( // What: Result Map. Why: Each match gets a card. How: This renders one card per matching place.


						<PlaCarCom
							key={ plaRecObj.sluStr }

							heaLevNum={ 2 }
							plaRecObj={ plaRecObj }
						/> // What: Place Card Component. Why: Each match shows as a place card. How: This renders the card for the place.


					))}


				</div>


			) : (


				<div className={ cssModObj.resNonDiv }>{ /* What: Results None Div Element. Why: An empty search should say so plainly and offer a way back. How: This sets the note and its button on a white panel. */ }


					<p className={ cssModObj.resNonPar }>No places match those choices. Try fewer words, or another town or kind.</p>{ /* What: Results None Paragraph Element. Why: The visitor should know nothing matched and what to try. How: This says so. */ }

					<button
						className={ cssModObj.resNonBut }

						type='button'

						onClick={ cleChoFun }
					>Show every place</button>{ /* What: Results None Button Element. Why: The quickest way back is clearing every choice. How: This empties them and moves focus to the search box. */ }


				</div>


			) }


		</div>


	);


}

// #endregion PlaPagCom

// #endregion Components



// #region Exports

export { PlaPagCom }; // What: Named Export. Why: The Places route renders this page. How: This exports PlaPagCom.

// #endregion Exports


