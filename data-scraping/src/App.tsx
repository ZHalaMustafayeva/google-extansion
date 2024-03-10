import './App.css'

function App() {

  const handleScrapeBtn = async () => {

    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: ScrapeData
    })
  }
  interface ProductData {
    product: {
      in_platform_id: string;
      title: string;
      platform_rating: string;
      img: string;
      reviews_count: string | number;
      price: string;
      seller: {
        in_platform_id: string;
        name: string;
        profile_url: string;
        platform: {
          name: string;
          url: string;
        }
      }
      url: string;
    }
    reviews: Review[]
  }
  interface Review {
    in_platform_id: string;
    review: string;
    is_recommended: boolean;
    platform_rating: string;
    author: {
      in_platform_id: string;
      full_name: string;
      profile_url: string
    }
  }
  const ScrapeData = () => {
    const sellerId = (document.querySelector('#sellerProfileTriggerId') as HTMLElement)?.getAttribute('sellerid') || '';
    if (!window.location.pathname.split('/')[2]){
      alert("This is not the product page! Please go to the product page for use this extension.")
    }
      const productDatas: ProductData = {
        product: {
          in_platform_id: window.location.pathname.split('/')[2],
          title: (document.querySelector('#productTitle') as HTMLElement)?.textContent?.trim() || '',
          platform_rating: (document.querySelector('.a-icon-star .a-icon-alt') as HTMLElement)?.textContent?.trim() || '',
          img: (document.querySelector('#imgTagWrapperId img') as HTMLImageElement)?.src || '',
          reviews_count: (document.querySelector('#acrCustomerReviewText') as HTMLElement)?.textContent?.trim().replace(/[^0-9]/g, '') || '',
          price: `${(document.querySelector('.a-price .a-offscreen') as HTMLElement)?.textContent?.trim() || ""}${(document.querySelector('.a-price-fraction') as HTMLElement)?.textContent?.trim() || ""}` || '',
          url: window.location.href,
          seller: {
            in_platform_id: (document.querySelector('#sellerProfileTriggerId') as HTMLElement)?.getAttribute('sellerid') || '',
            name: (document.querySelector('#sellerProfileTriggerId') as HTMLElement)?.textContent?.trim() || '',
            profile_url: `https://www.amazon.com/s?me=${sellerId}`,
            platform: {
              name: "amazon",
              url: "https://www.amazon.com"
            }
          }
        },
        reviews: []
      }
    const reviewElements: NodeListOf<Element> = document.querySelectorAll('.review');
    reviewElements.forEach(reviewElement => {
      const review: Review = {
        in_platform_id: reviewElement.getAttribute('id') || '',
        review: (reviewElement.querySelector('.review-text') as HTMLElement)?.textContent?.trim() || '',
        is_recommended: parseInt((reviewElement.querySelector('.review-rating .a-icon-alt') as HTMLElement)?.textContent || '0') > 3,
        platform_rating: (reviewElement.querySelector('.review-rating .a-icon-alt') as HTMLElement)?.textContent?.trim() || '',
        author: {
          in_platform_id: (reviewElement.querySelector('.a-profile') as HTMLElement)?.getAttribute('data-a-entity-id') || '',
          full_name: (reviewElement.querySelector('.a-profile-name') as HTMLElement)?.textContent?.trim() || '',
          profile_url: (reviewElement.querySelector('.a-profile') as HTMLElement)?.getAttribute('href') || ''
        }
      };

      productDatas.reviews.push(review);
    });
    console.log(productDatas)
  }
  return (
    <>

      <h3>Scraping data from Amazon</h3>
      <div className="card">
        <button onClick={handleScrapeBtn} >
          Scrape
        </button>
      </div>
    </>
  )
}

export default App
