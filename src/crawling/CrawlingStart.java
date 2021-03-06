package crawling;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class CrawlingStart {

    final static List<String> visited = new ArrayList<String>();
    final static Fetcher wf = new Fetcher();

	public static void main(String[] args) throws IOException {
		
		String destination = "http://m.kma.go.kr/m/index.jsp";
		String source = null;
		
		ArrayList<String> sourceList = new ArrayList<>();
		sourceList.add("https://www.facebook.com/4584asd415623/"); 			// 화장실유머
		sourceList.add("https://www.facebook.com/whereiswc/?ref=br_rs");	// 화장실NGO
		sourceList.add("https://www.facebook.com/yeoja2013/?ref=br_rs"); 	// 여자화장실
		
		for (String list : sourceList) {
			source = list;
			testConjecture(destination, source, 1);		
		}
	}

	public static void testConjecture(String destination, String source, int limit) throws IOException {
		String url = source;
		for (int i=0; i<limit; i++) {
			if (visited.contains(url)) {
				System.err.println("We're in a loop, exiting.");
				return;
			} else {
				visited.add(url);
			}
			Element elt = getFirstValidLink(url);
			
			Elements content = getParagraphContent(url); 
			System.out.println(content.text());
			
			if (elt == null) {
				System.err.println("Got to a page with no valid links.");
				return;
			}
			
			System.out.println("**" + elt.text() + "**");
			url = elt.attr("abs:href");
			
			if (url.equals(destination)) {
				System.out.println("Eureka!");
				break;
			}
		}
	}

	public static Element getFirstValidLink(String url) throws IOException {
		print("Fetching %s...", url);
		Elements paragraphs = wf.fetch(url);
		Parser wp = new Parser(paragraphs);
		Element elt = wp.findFirstLink();
		return elt;
	}
	
	public static Elements getParagraphContent(String url) throws IOException {
		Elements paragraphs = wf.fetch(url);
		return paragraphs;
	}

	private static void print(String msg, Object... args) {
		System.out.println(String.format(msg, args));
	}
}
