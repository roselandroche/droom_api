const Listing = require('../../models/listings-model');
const db = require('../../database/dbConfig');
const constant = require('../constants');

describe('The Listing Model', () => {
  const { listing, listingUpdate } = constant;

  beforeEach(async () => {
    await db.raw('TRUNCATE listings RESTART IDENTITY CASCADE');
  });

  test('Should add a listing', async () => {
    // Test Setup
    await Listing.addListing(listing);

    // Assertion
    const get = await Listing.getListings();
    expect(get[0].company).toBe(1);
    expect(get[0].position).toBe('Software Engineer in Test');
  });

  test('Should post multiple listings and be able to select the second listing', async () => {
    // Test Setup
    await Listing.addListing(listing);
    await Listing.addListing(listing);

    // Assertion
    const get = await Listing.getListing(2);
    expect(get.id).toBe(2);
  });

  test('Should be able to update a listing', async () => {
    // Test Setup
    await Listing.addListing(listing);
    await Listing.updateListing(1, listingUpdate);

    // Assertion
    const get = await Listing.getListing(1);
    expect(get.position).toBe('DevOps Engineer');
  });

  test('Should be able to delete a listing', async () => {
    // Test Setup
    await Listing.addListing(listing);
    await Listing.deleteListing(1);

    // Assertion
    const get = await Listing.getListings();
    expect(get.length).toBe(0);
  });
});
