package ro.pub.cs.systems.eim.eventreportandroid.network;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {
    @POST("report/report-event")
    Call<Void> reportEvent(@Body EventPayload payload);
}