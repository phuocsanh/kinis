package com.kinis.landmarkspose

import android.os.SystemClock
import android.content.Context
import android.util.Log
import com.google.mediapipe.framework.image.MPImage
import com.google.mediapipe.tasks.core.BaseOptions
import com.google.mediapipe.tasks.core.Delegate
import com.google.mediapipe.tasks.vision.poselandmarker.PoseLandmarkerResult
import com.mrousavy.camera.frameprocessors.Frame
import com.mrousavy.camera.frameprocessors.FrameProcessorPlugin
import com.mrousavy.camera.frameprocessors.VisionCameraProxy

import com.google.mediapipe.tasks.vision.core.RunningMode
import com.google.mediapipe.tasks.vision.poselandmarker.PoseLandmarker
class LandmarksPosePlugin(proxy: VisionCameraProxy, options: Map<String, Any>?,   private val context: Context): FrameProcessorPlugin() {
  companion object {
    const val TAG = "LandmarksPosePlugin"

    const val DELEGATE_CPU = 0
    const val DELEGATE_GPU = 1
    const val DEFAULT_POSE_DETECTION_CONFIDENCE = 0.5F
    const val DEFAULT_POSE_TRACKING_CONFIDENCE = 0.5F
    const val DEFAULT_POSE_PRESENCE_CONFIDENCE = 0.5F
    const val DEFAULT_NUM_POSES = 1
    const val OTHER_ERROR = 0
    const val GPU_ERROR = 1
    const val MODEL_POSE_LANDMARKER_FULL = 0
    const val MODEL_POSE_LANDMARKER_LITE = 1
    const val MODEL_POSE_LANDMARKER_HEAVY = 2
  }

  data class ResultBundle(
          val results: List<PoseLandmarkerResult>,
          val inferenceTime: Long,
          val inputImageHeight: Int,
          val inputImageWidth: Int,
  )

  interface LandmarkerListener {
    fun onError(error: String, errorCode: Int = OTHER_ERROR)
    fun onResults(resultBundle: ResultBundle)
  }


  override fun callback(frame: Frame, arguments: Map<String, Any>?): Any? {
    var poseLandmarker: PoseLandmarker? = null
    var currentDelegate: Int = LandmarksPosePlugin.DELEGATE_CPU
    val modelName = "pose_landmarker_lite.task"
    val baseOptionBuilder = BaseOptions.builder()
    var runningMode: RunningMode = RunningMode.IMAGE
    val poseLandmarkerHelperListener: LandmarkerListener? = null

    var minPoseDetectionConfidence: Float = LandmarksPosePlugin.DEFAULT_POSE_DETECTION_CONFIDENCE
    var minPoseTrackingConfidence: Float = LandmarksPosePlugin.DEFAULT_POSE_TRACKING_CONFIDENCE
    var minPosePresenceConfidence: Float = LandmarksPosePlugin.DEFAULT_POSE_PRESENCE_CONFIDENCE
    // Use the specified hardware for running the model. Default to CPU


     fun returnLivestreamResult(
            result: PoseLandmarkerResult,
            input: MPImage
    ) {
      val finishTimeMs = SystemClock.uptimeMillis()
      val inferenceTime = finishTimeMs - result.timestampMs()

      poseLandmarkerHelperListener?.onResults(
              ResultBundle(
                      listOf(result),
                      inferenceTime,
                      input.height,
                      input.width
              )
      )
    }

    // Return errors thrown during detection to this PoseLandmarkerHelper's
    // caller
     fun returnLivestreamError(error: RuntimeException) {
      poseLandmarkerHelperListener?.onError(
              error.message ?: "An unknown error has occurred"
      )
    }

    when (currentDelegate) {
      PoseLandmarkerHelper.DELEGATE_CPU -> {
        baseOptionBuilder.setDelegate(Delegate.CPU)
      }
      PoseLandmarkerHelper.DELEGATE_GPU -> {
        baseOptionBuilder.setDelegate(Delegate.GPU)
      }
    }

    baseOptionBuilder.setModelAssetPath(modelName)

    when (runningMode) {
      RunningMode.LIVE_STREAM -> {
        if (poseLandmarkerHelperListener == null) {
          throw IllegalStateException(
                  "poseLandmarkerHelperListener must be set when runningMode is LIVE_STREAM."
          )
        }
      }
      else -> {
        // no-op
      }
    }

    try {
      val baseOptions = baseOptionBuilder.build()
      // Create an option builder with base options and specific
      // options only use for Pose Landmarker.
      val optionsBuilder =
              PoseLandmarker.PoseLandmarkerOptions.builder()
                      .setBaseOptions(baseOptions)
                      .setMinPoseDetectionConfidence(minPoseDetectionConfidence)
                      .setMinTrackingConfidence(minPoseTrackingConfidence)
                      .setMinPosePresenceConfidence(minPosePresenceConfidence)
                      .setRunningMode(runningMode)

      // The ResultListener and ErrorListener only use for LIVE_STREAM mode.
//      if (runningMode == RunningMode.LIVE_STREAM) {
//        optionsBuilder
//                .setResultListener(returnLivestreamResult)
//                .setErrorListener(returnLivestreamError)
//      }

      val options = optionsBuilder.build()
      poseLandmarker =
              PoseLandmarker.createFromOptions(context, options)
    } catch (e: IllegalStateException) {
      poseLandmarkerHelperListener?.onError(
              "Pose Landmarker failed to initialize. See error logs for " +
                      "details"
      )
      Log.e(
              PoseLandmarkerHelper.TAG, "MediaPipe failed to load the task with error: " + e
              .message
      )
    } catch (e: RuntimeException) {
      // This occurs if the model being used does not support GPU
      poseLandmarkerHelperListener?.onError(
              "Pose Landmarker failed to initialize. See error logs for " +
                      "details", PoseLandmarkerHelper.GPU_ERROR
      )
      Log.e(
              PoseLandmarkerHelper.TAG,
              "Image classifier failed to load model with error: " + e.message
      )
    }

    val mpImage = BitmapImageBuilder(rotatedBitmap).build()
    return null
  }

}