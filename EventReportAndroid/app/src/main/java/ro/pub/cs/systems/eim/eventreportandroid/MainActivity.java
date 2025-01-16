package ro.pub.cs.systems.eim.eventreportandroid;

import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.ArrayAdapter;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.graphics.Insets;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;

import retrofit2.Call;
import ro.pub.cs.systems.eim.eventreportandroid.network.ApiService;
import ro.pub.cs.systems.eim.eventreportandroid.network.EventPayload;
import ro.pub.cs.systems.eim.eventreportandroid.network.RetrofitClient;

public class MainActivity extends AppCompatActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private EditText emailInput, descriptionInput;
    private Spinner eventTypeSpinner;
    private Button submitButton;
    private Marker eventMarker;

    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1;
    private FusedLocationProviderClient fusedLocationClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Set up window insets for edge-to-edge support
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // Set up the form fields
        emailInput = findViewById(R.id.email_input);
        descriptionInput = findViewById(R.id.description_input);
        eventTypeSpinner = findViewById(R.id.event_type_spinner);
        submitButton = findViewById(R.id.submit_button);

        // Populate the spinner with event types (you can modify this list)
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.event_types, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        eventTypeSpinner.setAdapter(adapter);

        // Obtain the SupportMapFragment and get notified when the map is ready to be used
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        if (mapFragment != null) {
            mapFragment.getMapAsync(this);
        }

        // Initialize the FusedLocationProviderClient
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        submitButton.setOnClickListener(view -> {
            String email = emailInput.getText().toString();
            String description = descriptionInput.getText().toString();
            String eventType = eventTypeSpinner.getSelectedItem().toString();

            if (eventMarker != null) {
                // Get the coordinates of the marker
                LatLng currentLocation = eventMarker.getPosition();
                double latitude = currentLocation.latitude;
                double longitude = currentLocation.longitude;

                // Validate inputs
                if (email.isEmpty() || description.isEmpty()) {
                    Log.e("SubmitButton", "Validation failed: Email or description is empty");
                    return;
                }

                // Create the payload
                EventPayload payload = new EventPayload(email, eventType, description, latitude, longitude);

                Log.e("Payload", payload.toString());

                // Initialize Retrofit and ApiService
                ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);

                // Make the POST request
                apiService.reportEvent(payload).enqueue(new retrofit2.Callback<Void>() {
                    @Override
                    public void onResponse(Call<Void> call, retrofit2.Response<Void> response) {
                        if (response.isSuccessful()) {
                            Log.i("SubmitButton", "Event reported successfully! Response Code: " + response.code());
                        } else {
                            Log.e("SubmitButton", "Failed to report event. Response Code: " + response.code());
                        }
                    }

                    @Override
                    public void onFailure(Call<Void> call, Throwable t) {
                        Log.e("SubmitButton", "Error reporting event", t);
                    }
                });
            } else {
                Log.e("SubmitButton", "Validation failed: No location selected on the map");
            }
        });
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            // Enable the My Location button and functionality
            mMap.setMyLocationEnabled(true);
            mMap.getUiSettings().setMyLocationButtonEnabled(true);  // Show the "My Location" button

            // Get the current location of the user
            fusedLocationClient.getLastLocation()
                    .addOnSuccessListener(this, location -> {
                        if (location != null) {
                            // Move camera to the user's current location
                            LatLng userLocation = new LatLng(location.getLatitude(), location.getLongitude());
                            mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(userLocation, 15f));
                        }
                    });

        } else {
            // If permission is not granted, request it
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);
        }

        // Enable zoom controls
        mMap.getUiSettings().setZoomControlsEnabled(true);

        // Set an onMapClickListener to allow the user to tap on the map to place the marker
        mMap.setOnMapClickListener(latLng -> {
            // Move the marker to the tapped location
            if (eventMarker != null) {
                eventMarker.setPosition(latLng);
            } else {
                eventMarker = mMap.addMarker(new MarkerOptions().position(latLng).title("Selected location").draggable(true));
            }
        });
    }
}
