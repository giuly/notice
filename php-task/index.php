<?php
/**
 * Class Item
 * Create an object with each RSS feed item 
 */
class Item {
  private $title, $link, $description, $pubDate, $guid, $enclosureUrl, $category;
  /**
   * Setter
   */
  public function __set($param, $value) {
    $this->$param = $value;
  }
  /**
   * Getter
   */
  public function __get($param) {
    if (property_exists($this, $param)) {
      return $this->$param;
    }
  }
}

/**
 * Class Sport Feed
 * Gets and processes an Rss Feed by a provided url 
 */
class SportFeed {
  private $items = array();
  private $imagesFolder;

  /**
   * Get Rss feed, iterate through it and add it to `items` enclosed param
   * @param string - rssUrl
   * @param string - imageFolder
   * @param boolean - delete
   */
  function __construct($rssUrl, $imagesFolder, $delete = false) {
    $this->imagesFolder = $imagesFolder;
    // [OPTIONAL] Empties `images` folder of any older image
    if($delete) { $this->emptyFolder(); }

    if (!($rssFeed = simplexml_load_file($rssUrl))) {
      throw new Exception("Err: Rss feed hasn't been returned.");
    }

    foreach ($rssFeed->channel->item as $item) {
      $itemObject = new Item();
      $itemObject->title        = (string) $item->title;
      $itemObject->link         = (string) $item->link;
      $itemObject->description  = (string) $item->description;
      $itemObject->pubDate      = (string) $item->pubDate;
      $itemObject->category     = (array) $item->category;
      $enclosureUrl  = (string) $item->enclosure->attributes()->url;
      $enclosureType = (string) $item->enclosure->attributes()->type;
      
      try {
        $itemObject->enclosureUrl = $this->downloadImage($enclosureUrl, $enclosureType);
      } catch(Exception $e) {
        throw New Exception("Err: " . $e->getMessage());
      }
      $this->items[] = $itemObject;
    }
  }

  /**
   * Function that downloads image from url, if doesn't exist localy
   * @param string imageUrl
   * @param string imageType
   * @return string localImageUrl
   */
  private function downloadImage($imageUrl, $imageType) {
    switch ($imageType) {
      case 'images/gif':
        $extension = '.gif';
        break;
      case 'image/png':
        $extension = '.png';
        break;
      default:
        $extension = '.jpg';
    }

    $localImageUrl = $this->imagesFolder . '/img_' . md5($imageUrl) . $extension;
    // Add image to local folder only if doesn't exist
    if(!file_exists($localImageUrl)) {
      $image = file_get_contents($imageUrl);
      if(!file_put_contents($localImageUrl, $image)) {
        throw New Exception("Err: Image hasn't been downloaded to local folder");
      } 
    }
    return $localImageUrl;
  }

  /**
   * Function that empties `images` folder
   */
  private function emptyFolder() {
    $files = glob($this->imagesFolder . '/*'); 
    foreach($files as $file){
      if(is_file($file))
      unlink($file);
    }
  }

  /**
   * Getter function that returns the items
   * @return array 
   */
  public function getItems() {
    return $this->items;
  }

  /**
   * Function that returns items in a requested JSON format
   * Proceed a validation - checks if there aren't items with same title
   * @return JSON items
   */
  public function getRss() {
    $items = array();
    foreach ($this->items as $item) {
      if(array_key_exists($item->title, $items)) { throw new Exception("Err: Item already added to this scope items array."); }
      $items[$item->title] = $item->enclosureUrl;
    }
    return json_encode($items);
  }
}

/* System */

// Print a JSON format, that will contain 
// an array of item->title => item->enclosure url attribute. 
// Example: 'Test title' => '/images/{image hashed name}'
$feedUrl = 'https://www.nu.nl/rss/Sport';
$imagesFolder = './images';

try {
  $feed = new SportFeed($feedUrl, $imagesFolder);
  header('Content-Type: application/json');
  print_r($feed->getRss());
} catch(Exception $e) {
  x($e->getMessage());
}



