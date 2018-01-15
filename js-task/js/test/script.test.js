var data = [{
  "category": "bal",
  "ID": "003",
  "name": "Vertball Shoulder Catch",
  "image": "bal_003.png",
  "video": {"en": "se_bal_003_en.mp4", "nl": "se_bal_003_nl.mp4", "de": "se_bal_003_de.mp4"},
  "regions": ["hamstring", "lower_back ", "buttocks"]
}, {
  "category": "bal",
  "ID": "004",
  "name": "Vertball Raise",
  "image": "bal_004.png",
  "video": {"en": "se_bal_004_en.mp4", "nl": "se_bal_004_nl.mp4", "de": "se_bal_004_de.mp4"},
  "regions": ["shoulders"]
}, {
  "category": "bal",
  "ID": "005",
  "name": "Slamball Slams",
  "image": "bal_005.png",
  "video": {"en": "se_bal_005_en.mp4", "nl": "se_bal_005_nl.mp4", "de": "se_bal_005_de.mp4"},
  "regions": ["shoulders", "abdomen"]
}, {
  "category": "bal",
  "ID": "006",
  "name": "Slamball Burpee Slam",
  "image": "bal_006.png",
  "video": {"en": "se_bal_006_en.mp4", "nl": "se_bal_006_nl.mp4", "de": "se_bal_006_de.mp4"},
  "regions": []
}];

describe('Throw Error', function() {
  it('should throw an error', function() {
    var filterObject = {categoryyyy:'bal'};
    expect(function() {
      scriptFunction.customFilter(data, filterObject)
    }).toThrow();
  })
})

describe('Object to Array', function() {
  it('should transform an object into an array', function() {
    var obj = {'en': "English"};
    expect(scriptFunction.objectToArray(obj)).toEqual(["English"]);
  })
});

describe('Filter by regions. The filter is "shoulders"', function() {
  it('should return a filtered array by regions with the filter "shoulder"', function() {
    var filterObject = {'regions':'shoulders'};
    var results = [{
      "category": "bal",
      "ID": "004",
      "name": "Vertball Raise",
      "image": "bal_004.png",
      "video": {"en": "se_bal_004_en.mp4", "nl": "se_bal_004_nl.mp4", "de": "se_bal_004_de.mp4"},
      "regions": ["shoulders"]
    }, {
      "category": "bal",
      "ID": "005",
      "name": "Slamball Slams",
      "image": "bal_005.png",
      "video": {"en": "se_bal_005_en.mp4", "nl": "se_bal_005_nl.mp4", "de": "se_bal_005_de.mp4"},
      "regions": ["shoulders", "abdomen"]
    }];
    expect(scriptFunction.customFilter(data, filterObject)).toEqual(results);
  })
});

