


/**
 * places.ts = Places
 *
 * @summary
 * Every place to eat the guide lists, as one table of records, plus the town
 * and kind lists the listing's filters offer, worked out from the table. The
 * first records come from research of public sources (each place's own site
 * or page, and directory and lake guide listings) and are still to be
 * curated by hand before launch: each carries the level of confidence its
 * sources gave it, and a detail no source confirmed is left out rather than
 * guessed.
 *
 * Sections:
 *  - Types
 *  - Constants
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Types

type CheLevTyp = 'high' | 'low' | 'maybe-closed' | 'medium'; // What: Check Level Type. Why: Each record says how sure its sources made it, so curation can start with the shakiest. How: This lists the four levels, from confirmed by the place's own page or an official listing to possibly closed.

type PlaRecTyp = { // What: Place Record Type. Why: The listing, the search, and the home page's picks all read the same record. How: This types one row of PLA_REC_ARR, whose shape block describes each field.


	addStr? : string,    // What: Address String. Why: A visitor needs to know where the place is. How: This holds its street address, left out where no source gave one.
	cheStr  : CheLevTyp, // What: Check String. Why: Curation needs to know how well each record is confirmed. How: This holds one of the check levels.
	desStr  : string,    // What: Description String. Why: A card says in a sentence what the place is. How: This holds that sentence, written for the guide.
	namStr  : string,    // What: Name String. Why: Every place is listed by its name. How: This holds the name as the place writes it.
	phoStr? : string,    // What: Phone String. Why: A visitor may want to call ahead. How: This holds the number as dashed digits, left out where no source gave one.
	seaBoo? : boolean,   // What: Seasonal Boolean. Why: Some lakeside places open only for the warm months. How: This is true where a source says so.
	sluStr  : string,    // What: Slug String. Why: Each place will have its own page at its own address. How: This holds the kebab-case name that address will use.
	tagArr  : string[],  // What: Tag Array. Why: Visitors look for a kind of food or a kind of place. How: This lists the place's kinds, which the search and the kind filter read.
	towStr  : string,    // What: Town String. Why: Visitors look for places near where they're staying. How: This holds the town the place's address names.
	webStr? : string     // What: Website String. Why: A visitor may want the place's own site or page. How: This holds its address, left out where no source gave one.


};

// #endregion Types



// #region Constants

// #region PLA_REC_ARR

/**
 * PLA_REC_ARR = Place Record Array
 *
 * @summary
 * Every place to eat the guide lists, in alphabetical order by name. Each
 * row is a PlaRecTyp, with these fields:
 *
 *  - `addStr` (string, optional): the street address.
 *
 *  - `cheStr` (CheLevTyp): how well the record is confirmed: `high` by the
 *    place's own page or an official listing, `medium` by several
 *    directories that agree, `low` by a single or stale source, and
 *    `maybe-closed` where a source says it closed or nothing recent turned
 *    up.
 *
 *  - `desStr` (string): one sentence about the place, for its card.
 *
 *  - `namStr` (string): the place's name.
 *
 *  - `phoStr` (string, optional): the phone number, as dashed digits.
 *
 *  - `seaBoo` (boolean, optional): true where the place opens only for the
 *    warm months.
 *
 *  - `sluStr` (string): the kebab-case name its own page's address will use.
 *
 *  - `tagArr` (string[]): its kinds of food or place.
 *
 *  - `towStr` (string): the town its address names.
 *
 *  - `webStr` (string, optional): its own site or page.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const PLA_REC_ARR : PlaRecTyp[] = [ // What: Place Record Array. Why: The guide's places live in one table that every page reads. How: This holds one row per place, in alphabetical order by name.


	{ // What: 254 Cafe Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '20254 MO-254, Wheatland, MO 65779',
		cheStr : 'medium',
		namStr : '254 Cafe',
		sluStr : '254-cafe',
		tagArr : [ 'Diner', 'Breakfast' ],
		towStr : 'Wheatland',
		webStr : 'https://www.facebook.com/people/254-Cafe/100090630271972/',

		desStr : 'A family-style diner on Highway 254 on the way to the lake, serving breakfast all day and a jumbo pork tenderloin.'


	},

	{ // What: Bobbies Cafe Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		cheStr : 'maybe-closed',
		namStr : "Bobbie's Cafe",
		sluStr : 'bobbies-cafe',
		tagArr : [ 'Cafe' ],
		towStr : 'Wheatland',

		desStr : 'A cafe in the Wheatland area.'


	},

	{ // What: Chicken Shack Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		cheStr : 'maybe-closed',
		namStr : 'Chicken Shack',
		sluStr : 'chicken-shack',
		tagArr : [ 'Fried Chicken' ],
		towStr : 'Hermitage',

		desStr : 'A fried chicken spot in Hermitage.'


	},

	{ // What: Elkton Country Cafe Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : 'Route 83 and Route H, Elkton, MO',
		cheStr : 'low',
		namStr : 'Elkton Country Cafe',
		sluStr : 'elkton-country-cafe',
		tagArr : [ 'Cafe', 'Home Cooking' ],
		towStr : 'Elkton',

		desStr : 'A village cafe at the Route 83 and Route H crossroads, serving burgers, sandwiches, and supper plates such as steaks and catfish.'


	},

	{ // What: Flying 3 Ranch Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		cheStr : 'maybe-closed',
		namStr : 'Flying 3 Ranch',
		sluStr : 'flying-3-ranch',
		tagArr : [],
		towStr : 'Wheatland',

		desStr : 'A place to eat in the Wheatland area.'


	},

	{ // What: Hermitage Coffee Shop Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		cheStr : 'low',
		namStr : 'Hermitage Coffee Shop',
		sluStr : 'hermitage-coffee-shop',
		tagArr : [ 'Coffee' ],
		towStr : 'Hermitage',

		desStr : 'A coffee shop in Hermitage.'


	},

	{ // What: Hickamo Country Store Cafe Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '18718 US-54, Wheatland, MO 65779',
		cheStr : 'high',
		namStr : 'Hickamo Country Store Cafe',
		phoStr : '417-282-1271',
		sluStr : 'hickamo-country-store-cafe',
		tagArr : [ 'Cafe', 'Breakfast', 'Fried Chicken' ],
		towStr : 'Wheatland',
		webStr : 'http://www.hickamo.com/',

		desStr : 'A country store on Highway 54 with a cafe serving breakfast specials, weekday plate lunches, tacos, and fried chicken.'


	},

	{ // What: Hickory House Bar And Grill Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		cheStr : 'maybe-closed',
		namStr : 'Hickory House Bar & Grill',
		sluStr : 'hickory-house-bar-and-grill',
		tagArr : [ 'Bar & Grill' ],
		towStr : 'Hermitage',

		desStr : 'A bar and grill in Hermitage.'


	},

	{ // What: Hickory Ridge Hwy 83 Marina And Resort Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '26933 Lightfoot Park, Flemington, MO',
		cheStr : 'low',
		namStr : 'Hickory Ridge Hwy 83 Marina & Resort',
		phoStr : '417-282-6341',
		seaBoo : true,
		sluStr : 'hickory-ridge-hwy-83-marina-and-resort',
		tagArr : [ 'Marina' ],
		towStr : 'Flemington',

		desStr : "A marina and resort on the lake's Lightfoot arm, off Highway 83, with a covered restaurant."


	},

	{ // What: Home Town Diner Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '22425 US-54, Hermitage, MO 65668',
		cheStr : 'medium',
		namStr : 'Home Town Diner',
		sluStr : 'home-town-diner',
		tagArr : [ 'Diner', 'Breakfast', 'Home Cooking' ],
		towStr : 'Hermitage',
		webStr : 'https://www.facebook.com/p/Home-Town-Diner-100036275084144/',

		desStr : 'A family-run diner on Highway 54 serving homemade breakfast and lunch, with fried chicken on Sundays and fresh rolls and pies.'


	},

	{ // What: Latte Da Coffee Co Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '19040 4th Ave, Wheatland, MO 65779',
		cheStr : 'low',
		namStr : 'Latte-Da Coffee Co',
		phoStr : '417-912-5717',
		sluStr : 'latte-da-coffee-co',
		tagArr : [ 'Coffee' ],
		towStr : 'Wheatland',
		webStr : 'https://www.facebook.com/people/Latte-Da-Coffee-Co/61558483534459/',

		desStr : 'A drink shop in Wheatland that also brings its drinks to events.'


	},

	{ // What: Luckys Restaurant And Sports Bar Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : 'State Highway 64B, Pittsburg, MO 65724',
		cheStr : 'maybe-closed',
		namStr : "Lucky's Restaurant & Sports Bar",
		phoStr : '417-852-1414',
		sluStr : 'luckys-restaurant-and-sports-bar',
		tagArr : [ 'Bar & Grill', 'Sports Bar' ],
		towStr : 'Pittsburg',

		desStr : 'A restaurant and sports bar on Highway 64B near the state park.'


	},

	{ // What: Marva Lous Day Donuts Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		cheStr : 'low',
		namStr : 'Marva-lous Day Donuts',
		sluStr : 'marva-lous-day-donuts',
		tagArr : [ 'Donuts' ],
		towStr : 'Hermitage',

		desStr : 'A donut shop in Hermitage.'


	},

	{ // What: Memaws Shake Shack Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '24145 MO-254, Hermitage, MO 65668',
		cheStr : 'medium',
		namStr : "Memaw's Shake Shack",
		phoStr : '417-745-0053',
		sluStr : 'memaws-shake-shack',
		tagArr : [ 'Burgers', 'Ice Cream' ],
		towStr : 'Hermitage',

		desStr : 'A roadside stop on Highway 254 for burgers, shakes, and ice cream treats.'


	},

	{ // What: Mikes Pomme BBQ Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '22636 County Road 205L, Wheatland, MO 65779',
		cheStr : 'low',
		namStr : "Mike's Pomme BBQ",
		sluStr : 'mikes-pomme-bbq',
		tagArr : [ 'BBQ' ],
		towStr : 'Wheatland',

		desStr : 'A barbecue spot in Wheatland, with brisket and ribs.'


	},

	{ // What: Mule Lip Bar And Grill Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		cheStr : 'maybe-closed',
		namStr : 'Mule Lip Bar & Grill',
		sluStr : 'mule-lip-bar-and-grill',
		tagArr : [ 'Bar & Grill' ],
		towStr : 'Wheatland',

		desStr : 'A bar and grill in the Wheatland area.'


	},

	{ // What: Nemo Lanes And Sports Bar Cafe Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '26868 State Hwy NN, Hermitage, MO 65668',
		cheStr : 'high',
		namStr : 'Nemo Lanes & Sports Bar Cafe',
		phoStr : '417-993-4274',
		sluStr : 'nemo-lanes-and-sports-bar-cafe',
		tagArr : [ 'Pizza', 'Sports Bar' ],
		towStr : 'Hermitage',
		webStr : 'http://www.nemolanes.com/',

		desStr : 'A ten-lane bowling alley near Nemo with a sports bar and cafe serving homemade pizza, sandwiches, wraps, and appetizers.'


	},

	{ // What: Nemo Marina Wild Soda Bar Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '23876 Nemo Park, Pittsburg, MO 65724',
		cheStr : 'high',
		namStr : 'Nemo Marina Wild Soda Bar',
		phoStr : '417-993-5160',
		seaBoo : true,
		sluStr : 'nemo-marina-wild-soda-bar',
		tagArr : [ 'Marina', 'Ice Cream' ],
		towStr : 'Pittsburg',
		webStr : 'https://www.nemomarina.com/',

		desStr : 'The marina at Nemo Landing, scooping hand-dipped Central Dairy ice cream and running a soda bar through the summer.'


	},

	{ // What: Our Kitchen Table Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		cheStr : 'low',
		namStr : 'Our Kitchen Table',
		sluStr : 'our-kitchen-table',
		tagArr : [ 'Home Cooking' ],
		towStr : 'Weaubleau',

		desStr : 'A small, couple-run restaurant in Weaubleau with daily specials beside its regular menu, including a catfish basket.'


	},

	{ // What: Ozark Mountain Gourmet Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		cheStr : 'low',
		namStr : 'Ozark Mountain Gourmet',
		sluStr : 'ozark-mountain-gourmet',
		tagArr : [ 'American' ],
		towStr : 'Hermitage',

		desStr : 'An American restaurant in Hermitage.'


	},

	{ // What: Paulie Ds Pizza Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '21062 MO-254, Wheatland, MO 65779',
		cheStr : 'medium',
		namStr : "Paulie D's Pizza",
		phoStr : '417-406-0959',
		sluStr : 'paulie-ds-pizza',
		tagArr : [ 'Pizza' ],
		towStr : 'Wheatland',
		webStr : 'http://www.pauliedspizza.com/',

		desStr : 'A hometown pizza place near the lake, making hand-tossed and thin-crust pizzas with dough made fresh every day.'


	},

	{ // What: Petes Paradise Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '19998 MO-254, Wheatland, MO 65779',
		cheStr : 'medium',
		namStr : "Pete's Paradise",
		phoStr : '417-282-1520',
		sluStr : 'petes-paradise',
		tagArr : [ 'Bar & Grill', 'Live Music' ],
		towStr : 'Wheatland',
		webStr : 'https://www.facebook.com/people/Petes-Paradise/61577450480116/',

		desStr : 'A bar and restaurant on Highway 254 with a full kitchen and live music.'


	},

	{ // What: Pittsburg Pub And Patio Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '23776 County Road 277, Pittsburg, MO 65724',
		cheStr : 'maybe-closed',
		namStr : 'Pittsburg Pub & Patio',
		phoStr : '417-852-4452',
		sluStr : 'pittsburg-pub-and-patio',
		tagArr : [ 'Bar & Grill', 'Breakfast', 'Live Music' ],
		towStr : 'Pittsburg',
		webStr : 'https://www.facebook.com/PittsburgPub/',

		desStr : 'A pub on the Pittsburg side of the lake serving sandwiches, burgers, catfish, and breakfast, with a patio and live music.'


	},

	{ // What: Pomme De Ritas Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '24474 MO-254, Hermitage, MO 65668',
		cheStr : 'medium',
		namStr : 'Pomme De Ritas',
		phoStr : '417-745-6900',
		sluStr : 'pomme-de-ritas',
		tagArr : [ 'Tex-Mex', 'BBQ', 'Live Music' ],
		towStr : 'Hermitage',
		webStr : 'https://www.facebook.com/profile.php?id=100076350699376',

		desStr : 'A Highway 254 restaurant near the lake serving Tex-Mex and barbecue, with weekend breakfast and regular live bands.'


	},

	{ // What: Pomme De Terre Grill Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '25817 State Highway 64, Pittsburg, MO 65724',
		cheStr : 'maybe-closed',
		namStr : 'Pomme de Terre Grill',
		sluStr : 'pomme-de-terre-grill',
		tagArr : [ 'Bar & Grill' ],
		towStr : 'Pittsburg',

		desStr : 'A grill on Highway 64 in Pittsburg.'


	},

	{ // What: Pomme De Terre State Park Marina Store And Grill Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '23451 Park Entrance Rd, Pittsburg, MO 65724',
		cheStr : 'high',
		namStr : 'Pomme de Terre State Park Marina Store & Grill',
		phoStr : '417-852-1031',
		seaBoo : true,
		sluStr : 'pomme-de-terre-state-park-marina-store-and-grill',
		tagArr : [ 'Marina', 'Burgers', 'Ice Cream' ],
		towStr : 'Pittsburg',
		webStr : 'https://mofunparks.com/',

		desStr : "The store and grill at the state park's Pittsburg marina, serving burgers, fish tacos, brisket burgers, Philly sandwiches, and hand-dipped ice cream."


	},

	{ // What: Preston Cafe Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '18445 US-65, Preston, MO 65732',
		cheStr : 'low',
		namStr : 'Preston Cafe',
		sluStr : 'preston-cafe',
		tagArr : [ 'Diner', 'Breakfast' ],
		towStr : 'Preston',

		desStr : 'A small roadside cafe in Preston serving breakfast and lunch comfort food, from chicken fried steak to biscuits and gravy.'


	},

	{ // What: Rural Sips And Dips Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '18314 US-65, Preston, MO 65732',
		cheStr : 'low',
		namStr : 'Rural Sips & Dips',
		phoStr : '417-718-9337',
		sluStr : 'rural-sips-and-dips',
		tagArr : [ 'Ice Cream', 'Coffee' ],
		towStr : 'Preston',
		webStr : 'https://www.facebook.com/people/Rural-Sips-Dips/61577094878722/',

		desStr : 'A small shop on Highway 65 in Preston serving drinks and ice cream beside its gifts.'


	},

	{ // What: Sidetrack Lounge And Cafe Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		cheStr : 'maybe-closed',
		namStr : 'Sidetrack Lounge & Cafe',
		sluStr : 'sidetrack-lounge-and-cafe',
		tagArr : [ 'Cafe' ],
		towStr : 'Wheatland',

		desStr : 'A lounge and cafe in the Wheatland area.'


	},

	{ // What: The Crappie Hole Bar And Grill Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '20774 County Road 295, Hermitage, MO 65668',
		cheStr : 'medium',
		namStr : 'The Crappie Hole Bar & Grill',
		phoStr : '417-745-0220',
		sluStr : 'the-crappie-hole-bar-and-grill',
		tagArr : [ 'Bar & Grill' ],
		towStr : 'Hermitage',
		webStr : 'https://www.facebook.com/people/Crappie-Hole-Bar-Grill/100057376071437/',

		desStr : 'A casual bar and grill near the lake serving comfort food such as fried fish, steaks, and sandwiches, with a full bar.'


	},

	{ // What: The Harbor Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '23140 Quarry Point Rd, Hermitage, MO 65668',
		cheStr : 'medium',
		namStr : 'The Harbor',
		phoStr : '417-745-6868',
		seaBoo : true,
		sluStr : 'the-harbor',
		tagArr : [ 'Marina', 'Bar & Grill', 'Live Music' ],
		towStr : 'Hermitage',
		webStr : 'https://www.facebook.com/theharborafloatinggoodtime/',

		desStr : 'A restaurant and lounge on the water at Harbor Campground and Marina, a lake hangout with bands and drinks.'


	},

	{ // What: The Rustic Spoon Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '11446 US-54, Weaubleau, MO 65774',
		cheStr : 'medium',
		namStr : 'The Rustic Spoon',
		phoStr : '417-428-3019',
		sluStr : 'the-rustic-spoon',
		tagArr : [ 'Breakfast', 'BBQ', 'Desserts' ],
		towStr : 'Weaubleau',
		webStr : 'http://www.therusticspoonweaubleau.com/',

		desStr : 'A family restaurant on Highway 54 serving breakfast, smoked brisket, pork, and chicken, and desserts such as sundaes and cheesecake.'


	},

	{ // What: Tipsy Mule FOB550 Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '19998 MO-254, Wheatland, MO 65779',
		cheStr : 'maybe-closed',
		namStr : 'Tipsy Mule FOB550',
		sluStr : 'tipsy-mule-fob550',
		tagArr : [ 'Bar & Grill', 'BBQ' ],
		towStr : 'Wheatland',
		webStr : 'https://www.facebook.com/profile.php?id=100093273338939',

		desStr : 'A bar and barbecue spot on Highway 254.'


	},

	{ // What: Tonys BBQ Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '17668 County Road 240, Weaubleau, MO',
		cheStr : 'low',
		namStr : "Tony's BBQ",
		sluStr : 'tonys-bbq',
		tagArr : [ 'BBQ' ],
		towStr : 'Weaubleau',

		desStr : 'A barbecue spot on a county road near Weaubleau.'


	},

	{ // What: Town Video And Pizza Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		cheStr : 'maybe-closed',
		namStr : 'Town Video & Pizza',
		sluStr : 'town-video-and-pizza',
		tagArr : [ 'Pizza' ],
		towStr : 'Hermitage',

		desStr : 'A pizza and video shop in Hermitage.'


	},

	{ // What: Turn 1 Bar And Grill Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		addStr : '19502 MO-254, Wheatland, MO 65779',
		cheStr : 'medium',
		namStr : 'Turn 1 Bar & Grill',
		phoStr : '417-282-1662',
		sluStr : 'turn-1-bar-and-grill',
		tagArr : [ 'Bar & Grill', 'Sports Bar' ],
		towStr : 'Wheatland',
		webStr : 'https://www.facebook.com/people/Turn-1-Bar-Grill/61550854203518/',

		desStr : 'A NASCAR-themed bar and grill near Lucas Oil Speedway with daily specials, pool, and darts.'


	},

	{ // What: Vickie And Tims Row. Why: This is one place to eat in the guide. How: The shape block above describes its fields.


		cheStr : 'maybe-closed',
		namStr : "Vickie & Tim's",
		sluStr : 'vickie-and-tims',
		tagArr : [ 'Fast Food' ],
		towStr : 'Hermitage',

		desStr : 'A fast food spot in Hermitage.'


	}


];

// #endregion PLA_REC_ARR


const TAG_NAM_ARR = [ ...new Set( PLA_REC_ARR.flatMap( ( plaRecObj ) => plaRecObj.tagArr ) ) ].sort(); // What: Tag Name Array. Why: The kind filter offers every kind some place carries, and only those. How: This gathers every row's tags, drops repeats, and sorts them alphabetically.
const TOW_NAM_ARR = [ ...new Set( PLA_REC_ARR.map( ( plaRecObj ) => plaRecObj.towStr ) ) ].sort();     // What: Town Name Array. Why: The town filter offers every town some place is in, and only those. How: This gathers every row's town, drops repeats, and sorts them alphabetically.

// #endregion Constants



// #region Exports

export { PLA_REC_ARR, type PlaRecTyp, TAG_NAM_ARR, TOW_NAM_ARR }; // What: Named Exports. Why: The pages read the places and the filter lists, and type the records they pass around. How: This exports the table, its record type, and the two lists.

// #endregion Exports


