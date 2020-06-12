from django.http import HttpResponse
import GetOldTweets3 as got
import json
from django.http import JsonResponse
    

def index(request):
    tweeterResponse = []
    # obj = request.GET('tweet_name')
    value = tweet(request.GET['tweet_name'])
    for index,data in enumerate(value):
        # print(index,data)
        tweeterResponse.append(data.text)

    print(tweeterResponse)

    result = json.dumps({'data':tweeterResponse})
    response = JsonResponse(
            # your stuff here
            {'data':tweeterResponse}
        )
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response
    # return HttpResponse(result)



def tweet(user_name=''):
    tweetCriteria = got.manager.TweetCriteria().setUsername(user_name)\
                                            .setTopTweets(True)\
                                           .setMaxTweets(10)
    tweet = got.manager.TweetManager.getTweets(tweetCriteria)
    return tweet