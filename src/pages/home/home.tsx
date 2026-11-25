


// #region Imports

import cssModObj from './home.module.css'; // What: CSS Module Object. Why: The home page is styled in its own module, whose class names Vite hashes. How: Each class an element carries is read from this object.


import { HerMapCom   } from './hero-map.tsx';          // What: Hero Map Component. Why: The hero's backdrop is a trail map of the lake country. How: This draws it behind the hero's text.
import { Link        } from 'react-router';            // What: Link. Why: The page's buttons move to other pages without a full page load. How: This renders each one as a router link.
import { MapPinCom   } from '../../ui/map-pin.tsx';    // What: Map Pin Component. Why: Each how it works step is marked with a numbered pin. How: This draws the large pin with its step's number.
import { PLA_REC_ARR } from '../../core/places.ts';    // What: Place Record Array. Why: The picks are drawn from the guide's places. How: This is the table they're chosen from.
import { PlaCarCom   } from '../../ui/place-card.tsx'; // What: Place Card Component. Why: Each pick shows as a place card. How: This renders one card per pick.
import { useNavigate } from 'react-router';            // What: Use Navigate. Why: The hero's search should open the listing inside the router. How: This returns the function the form's submit calls.
import { useState    } from 'react';                   // What: Use State. Why: The picks are chosen once per visit, not on every render. How: This holds them, chosen by its initializer.

// #endregion Imports



/**
 * home.tsx = Home Page
 *
 * @summary
 * The site's landing page: a hero over a trail map of the lake country that
 * says what the guide is and searches it, three steps on how to use it, three
 * places chosen at random from the better confirmed ones under "Worth the
 * drive", and a navy band inviting owners to add their place or update its
 * listing. Its title and description are index.html's own, so it sets
 * neither.
 *
 * Sections:
 *  - Constants
 *  - Helpers
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const PIC_COU_NUM = 3; // What: Pick Count Number. Why: Three picks fill one row of cards on a wide screen. How: picPlaFun chooses this many places.



/**
 * STE_REC_ARR = Step Record Array
 *
 * @summary
 * The how it works steps, in the order a visit follows them, each row with
 * these fields:
 *
 *  - `numStr` (string): the step's number, shown on its pin.
 *
 *  - `texStr` (string): a sentence explaining the step.
 *
 *  - `titStr` (string): the step's title.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const STE_REC_ARR = [ // What: Step Record Array. Why: The how it works steps follow one order. How: Each row names a step's number, title, and text.


	{ // What: Search Step Row. Why: A visit starts by finding a place. How: This is the first step.


		numStr : '1',
		titStr : 'Search or browse',

		texStr : "Look a place up by name, or narrow the list by town or by what you're hungry for."


	},

	{ // What: Details Step Row. Why: A listing says what a visitor needs before going. How: This is the second step.


		numStr : '2',
		titStr : 'Check the details',

		texStr : 'Every listing shows what a place serves and how to reach it. Pages of their own, with menus, are on the way.'


	},

	{ // What: Visit Step Row. Why: The point of the guide is a good meal. How: This is the third step.


		numStr : '3',
		titStr : 'Head on over',

		texStr : 'Call ahead, get directions, and enjoy a meal by the lake.'


	}


];

// #endregion Constants



// #region Helpers

// #region picPlaFun

/**
 * picPlaFun = Pick Places Function
 *
 * @summary
 * Chooses the home page's picks: PIC_COU_NUM places at random from those
 * whose records are confirmed at the high or medium level, so a visitor's
 * first look at the guide shows places most likely to be open. It shuffles a
 * copy of those places and takes the first ones, leaving the table itself
 * untouched.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param void - This function takes no parameters.
 *
 * @returns The chosen places, in random order.
 * @see {@link shuPlaArr}
 *
 * @example
 * ```ts
 * picPlaFun() // => three place records
 * ```
 *
*/

function picPlaFun () {


	const conPlaArr = PLA_REC_ARR.filter( ( plaRecObj ) => plaRecObj.cheStr === 'high' || plaRecObj.cheStr === 'medium' ); // What: Confirmed Place Array. Why: The picks should be places the sources agree on. How: This keeps the records checked at the high or medium level.
	const shuPlaArr = conPlaArr.map( ( plaRecObj ) => ( { plaRecObj, sorNum : Math.random() } ) ).sort( ( oneEntObj, twoEntObj ) => oneEntObj.sorNum - twoEntObj.sorNum ).slice( 0, PIC_COU_NUM ).map( ( entCurObj ) => entCurObj.plaRecObj ); // What: Shuffled Place Array. Why: Each visit should show a different few. How: This pairs every place with a random number, sorts by it, keeps the first few, and unpairs them.



	return shuPlaArr; // What: Shuffled Places Return. Why: The page shows these as its picks. How: This hands them back.


}

// #endregion picPlaFun

// #endregion Helpers



// #region Components

// #region HomPagCom

/**
 * HomPagCom = Home Page Component
 *
 * @summary
 * Renders the home page. The hero's search sends its words to the listing as
 * its query, inside the router, so the listing opens already searched; the
 * form still names the listing as its action, so it works the same before
 * the script loads. The picks are chosen once, when the page first renders,
 * so they hold still while the visitor reads. The owners' buttons open the
 * Contact page with adding a place or updating a listing already chosen.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's wrapper div.
 *
 * @example
 * ```tsx
 * HomPagCom() // => <HomPagCom />
 * ```
 *
*/

function HomPagCom () : React.JSX.Element {


	const [ picPlaArr ] = useState( picPlaFun ); // What: Picked Place Array. Why: The picks should hold still once shown. How: This chooses them once, through picPlaFun, and keeps them for the page's life.

	const navRouFun = useNavigate(); // What: Navigate Route Function. Why: The search opens the listing inside the router. How: The form's submit calls it with the listing's address.



	return (


		<div className={ cssModObj.homPagDiv }>{ /* What: Home Page Div Element. Why: The page arrives gently and holds its sections in order. How: This fades the page in and stacks the hero, the steps, the picks, and the owners' band. */ }


			<link
				href='https://pommedeterreeats.com/'
				rel='canonical'
			/>{ /* What: Page Canonical Link Element. Why: Search engines should index the home page at one address. How: React places this in the head while the page shows. */ }



			<section
				className={ cssModObj.homHerSec }

				aria-labelledby='homHerHea'
			>{ /* What: Home Hero Section Element. Why: The page opens by saying what the guide is and offering its search. How: This sets the trail map behind the hero's text on the pale navy tint, named by its heading. */ }


				<HerMapCom />{ /* What: Hero Map Component. Why: The hero's backdrop is a trail map of the lake country. How: This draws the contour lines, the dotted trail, and its pins behind the text. */ }



				<div className={ cssModObj.herInnDiv }>{ /* What: Hero Inner Div Element. Why: The hero's text sits in the page's centered column, above the map. How: This stacks the eyebrow, the heading, the lead, and the search. */ }


					<p className={ cssModObj.herEyePar }>Your guide to eating around the lake</p>{ /* What: Hero Eyebrow Paragraph Element. Why: A short label sets up the heading. How: This shows it small and bold in navy. */ }

					<h1
						id='homHerHea'

						className={ cssModObj.herTitHea }
					>Find your next meal at Lake Pomme de Terre.</h1>{ /* What: Hero Title Heading Element. Why: The page's one heading says what the guide is for. How: This shows it large, naming the hero section through its ID. */ }

					<p className={ cssModObj.herLeaPar }>From Hermitage to Pittsburg to Wheatland, every diner, marina grill, and pizza counter around the lake, gathered in one place.</p>{ /* What: Hero Lead Paragraph Element. Why: A sentence says what the guide holds. How: This shows it a step larger than body text, in slate. */ }



					<form
						className={ cssModObj.herSeaFor }

						action='/places'
						method='get'
						role='search'

						onSubmit={ ( subEveObj ) => { // What: Search Submit Handler. Why: The listing should open searched without a full page load. How: This cancels the browser's own submit and routes to the listing with the trimmed words as its query, or with no query when the box is empty.


							subEveObj.preventDefault(); // What: Default Prevent Call. Why: The browser's own submit would reload the whole site. How: This cancels it.


							const queTexStr = new FormData( subEveObj.currentTarget ).get( 'q' )?.toString().trim() ?? ''; // What: Query Text String. Why: The listing searches for what the visitor typed. How: This reads the box's words, trimmed, or nothing.



							navRouFun( queTexStr ? `/places?q=${ encodeURIComponent( queTexStr ) }` : '/places' ); // What: Listing Route Call. Why: The words have to reach the listing. How: This routes to it with the words as its query, or bare when there are none.


						} }
					>{ /* What: Hero Search Form Element. Why: Searching is the quickest way into the guide. How: This sets the box beside the button, marked as a search landmark, wrapping below about 480px wide. */ }


						<label
							className={ cssModObj.visHidSpa }

							htmlFor='herSeaInp'
						>Search places</label>{ /* What: Hero Search Label Element. Why: The box needs a name for screen readers, though its placeholder shows its purpose. How: This labels it, hidden from view. */ }

						<input
							id='herSeaInp'

							className={ cssModObj.herSeaInp }

							name='q'

							placeholder='Search places, towns, or food'
							type='search'
						/>{ /* What: Hero Search Input Element. Why: The visitor types what they're looking for. How: This is the search box, named q, which the listing reads as its query. */ }

						<button
							className={ cssModObj.herSeaBut }

							type='submit'
						>Search</button>{ /* What: Hero Search Button Element. Why: The search needs a clear way to go. How: This submits the form, set as a filled navy button. */ }


					</form>


				</div>


			</section>



			<section
				className={ cssModObj.homSteSec }

				aria-labelledby='homSteHea'
			>{ /* What: Home Steps Section Element. Why: A first-time visitor should see how the guide works. How: This holds the heading and the three steps on white, named by its heading. */ }


				<div className={ cssModObj.steInnDiv }>{ /* What: Steps Inner Div Element. Why: The steps sit in the page's centered column. How: This stacks the heading above the steps. */ }


					<h2
						id='homSteHea'

						className={ cssModObj.secTitHea }
					>How it works</h2>{ /* What: Section Title Heading Element. Why: The section names itself. How: This shows the heading, naming the steps section through its ID. */ }



					<ol className={ cssModObj.steLisOrd }>{ /* What: Steps List Ordered Element. Why: The steps happen in order, which screen readers announce. How: This sets the three steps side by side above 960px wide, and stacks them at 960px and below. */ }


						{ STE_REC_ARR.map( ( steRecObj ) => ( // What: Step Map. Why: Each step gets a list item. How: This renders one item per row of STE_REC_ARR.


							<li
								key={ steRecObj.numStr }

								className={ cssModObj.steIteIte }
							>{ /* What: Step Item Item Element. Why: Each step's pin leads its words. How: This sets the numbered pin beside the step's title and text. */ }


								<MapPinCom
									numStr={ steRecObj.numStr }
									sizStr='large'
								/>{ /* What: Map Pin Component. Why: Each step is marked with its numbered pin, as on a trail map. How: This draws the large pin with the step's number. */ }



								<div className={ cssModObj.steTexDiv }>{ /* What: Step Text Div Element. Why: The step's title and text read as one block beside its pin. How: This stacks them. */ }


									<h3 className={ cssModObj.steTitHea }>{ steRecObj.titStr }</h3>{ /* What: Step Title Heading Element. Why: Each step names itself. How: This shows the step's title. */ }

									<p className={ cssModObj.steTexPar }>{ steRecObj.texStr }</p>{ /* What: Step Text Paragraph Element. Why: A sentence explains the step. How: This shows the step's text in slate. */ }


								</div>


							</li>


						))}


					</ol>


				</div>


			</section>



			<section
				className={ cssModObj.homPicSec }

				aria-labelledby='homPicHea'
			>{ /* What: Home Picks Section Element. Why: A few places show what the guide holds and invite a closer look. How: This holds the heading row and the picks' cards, named by its heading. */ }


				<div className={ cssModObj.picHeaDiv }>{ /* What: Picks Heading Div Element. Why: The section's heading and its link to the full listing share a row. How: This sets the heading at the start and the link at the end, wrapping the link below on a narrow screen. */ }


					<h2
						id='homPicHea'

						className={ cssModObj.secTitHea }
					>Worth the drive</h2>{ /* What: Section Title Heading Element. Why: The section names itself. How: This shows the heading, naming the picks section through its ID. */ }

					<Link
						className={ cssModObj.picAllAnc }

						to='/places'
					>See every place <span className={ cssModObj.picArrSpa } aria-hidden='true'>→</span></Link>{ /* What: Picks All Anchor Link. Why: The picks are a taste, and the full listing is one click away. How: This routes to the listing, its arrow hidden from screen readers and nudged right on hover. */ }


				</div>



				<div className={ cssModObj.picGriDiv }>{ /* What: Picks Grid Div Element. Why: The three picks read as one row of cards. How: This sets them three across above 960px wide, two across with the third centered below from 960px down to 641px, and one across at 640px and below. */ }


					{ picPlaArr.map( ( plaRecObj ) => ( // What: Pick Map. Why: Each pick gets a card. How: This renders one card per chosen place.


						<PlaCarCom
							key={ plaRecObj.sluStr }

							heaLevNum={ 3 }
							plaRecObj={ plaRecObj }
						/> // What: Place Card Component. Why: Each pick shows as a place card. How: This renders the card for the place.


					))}


				</div>


			</section>



			<section
				className={ cssModObj.homOwnSec }

				aria-labelledby='homOwnHea'
			>{ /* What: Home Owners Section Element. Why: Owners are the guide's other audience, and the page should tell them how to take part. How: This holds the navy band, named by its heading. */ }


				<div className={ cssModObj.ownBanDiv }>{ /* What: Owners Band Div Element. Why: The owners' invitation should stand apart from the rest of the page. How: This sets it on a rounded navy panel, the words beside the buttons above 960px wide and above them at 960px and below. */ }


					<div className={ cssModObj.ownTexDiv }>{ /* What: Owners Text Div Element. Why: The invitation's words read as one block. How: This stacks the eyebrow, the heading, and the text. */ }


						<p className={ cssModObj.ownEyePar }>For owners</p>{ /* What: Owners Eyebrow Paragraph Element. Why: A short label says who the band is for. How: This shows it small and uppercase in the light coral. */ }

						<h2
							id='homOwnHea'

							className={ cssModObj.ownTitHea }
						>Run a place to eat near the lake?</h2>{ /* What: Owners Title Heading Element. Why: The band asks owners directly. How: This shows the question in white, naming the owners section through its ID. */ }

						<p className={ cssModObj.ownTexPar }>If it isn't listed yet, tell us and we'll add it. If it is, send us your changes, from new hours to a whole new menu, and we'll keep your listing current.</p>{ /* What: Owners Text Paragraph Element. Why: Owners should know both ways in. How: This explains adding a place and updating a listing, in the pale blue. */ }


					</div>



					<div className={ cssModObj.ownActDiv }>{ /* What: Owners Actions Div Element. Why: Each way in gets its own button. How: This sets the two buttons in a row, wrapping onto two lines where they don't fit. */ }


						<Link
							className={` ${ cssModObj.butBasAnc }   ${ cssModObj.butBasAncCoral } `}

							to='/contact?reason=add'
						>Add my place</Link>{ /* What: Button Base Anchor Coral Link. Why: Adding a place is the band's main action. How: This routes to the Contact page with adding a place chosen, set as a coral button with dark text. */ }

						<Link
							className={` ${ cssModObj.butBasAnc }   ${ cssModObj.butBasAncOutline } `}

							to='/contact?reason=update'
						>Update my listing</Link>{ /* What: Button Base Anchor Outline Link. Why: Updating a listing is the band's other action. How: This routes to the Contact page with updating a listing chosen, set as a white outlined button. */ }


					</div>


				</div>


			</section>


		</div>


	);


}

// #endregion HomPagCom

// #endregion Components



// #region Exports

export { HomPagCom }; // What: Named Export. Why: The home route renders this page. How: This exports HomPagCom.

// #endregion Exports


