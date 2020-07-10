# rntemplate

RN template

// FIX @mauron85\react-native-background-geolocation
...\node_modules\@mauron85\react-native-background-geolocation\android\common\VERSIONS.gradle

if (findProject('..:app') != null && project('..:app').hasProperty('android')) {
applicationId = project('..:app').android.defaultConfig.applicationId
} else if (findProject(':app') != null && project(':app').hasProperty('android')) {
applicationId = project(':app').android.defaultConfig.applicationId
}
