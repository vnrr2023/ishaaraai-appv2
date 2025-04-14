// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-backend-webgl';
// import labels from './labels.json';

// const numClass = labels.length;

// /**
//  * Preprocess the image tensor for the model
//  */
// const preprocess = (imageTensor, modelWidth, modelHeight) => {
//   let xRatio, yRatio;

//   const processed = tf.tidy(() => {
//     // Get image dimensions
//     const [h, w] = imageTensor.shape.slice(0, 2);
//     const maxSize = Math.max(w, h);
    
//     // Pad the image to make it square
//     const imgPadded = tf.image.resizeBilinear(imageTensor, [maxSize, maxSize]);
    
//     xRatio = maxSize / w;
//     yRatio = maxSize / h;
    
//     // Resize to model input size and normalize
//     return tf.image.resizeBilinear(imgPadded, [modelWidth, modelHeight])
//       .div(255.0)
//       .expandDims(0);
//   });

//   return [processed, xRatio, yRatio];
// };

// /**
//  * Detect objects in an image tensor
//  */
// export const detectFromImage = async (imageTensor, model, onLabelDetected = () => {}) => {
//   if (!model || !model.net || !model.inputShape || model.inputShape.length < 3) {
//     console.error("Model input shape is invalid");
//     return null;
//   }

//   const [modelWidth, modelHeight] = model.inputShape.slice(1, 3);
//   const tensors = [];
  
//   try {
//     // Preprocess the image
//     const [input, xRatio, yRatio] = preprocess(imageTensor, modelWidth, modelHeight);
//     tensors.push(input);
    
//     // Run inference
//     const res = await model.net.executeAsync(input);
//     tensors.push(res);
    
//     // Process results
//     const transRes = tf.tidy(() => (
//       Array.isArray(res) ? res[0].transpose([0, 2, 1]) : res.transpose([0, 2, 1])
//     ));
//     tensors.push(transRes);
    
//     // Extract boxes, scores, and classes
//     let boxes, scores, classes;
//     [boxes, scores, classes] = tf.tidy(() => {
//       const w = transRes.slice([0, 0, 2], [-1, -1, 1]);
//       const h = transRes.slice([0, 0, 3], [-1, -1, 1]);
//       const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2));
//       const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2));
      
//       const boxes = tf.concat([y1, x1, tf.add(y1, h), tf.add(x1, w)], 2).squeeze();
      
//       const rawScores = transRes.slice([0, 0, 4], [-1, -1, numClass]).squeeze(0);
//       return [boxes, rawScores.max(1), rawScores.argMax(1)];
//     });
//     tensors.push(boxes, scores, classes);
    
//     // Non-maximum suppression to remove overlapping boxes
//     const nms = await tf.image.nonMaxSuppressionAsync(boxes, scores, 500, 0.45, 0.2);
//     tensors.push(nms);
    
//     // Get data from tensors
//     const boxes_data = boxes.gather(nms, 0).dataSync();
//     const scores_data = scores.gather(nms, 0).dataSync();
//     const classes_data = classes.gather(nms, 0).dataSync();
    
//     // Find highest confidence detection
//     if (classes_data.length > 0) {
//       const highestConfidenceIndex = scores_data.indexOf(Math.max(...scores_data));
//       const detectedLabel = labels[classes_data[highestConfidenceIndex]];
//       const confidence = scores_data[highestConfidenceIndex];
      
//       // Only report detections with confidence above threshold
//       if (confidence > 0.5) {
//         onLabelDetected(detectedLabel);
//       }
      
//       // Return detection results
//       return {
//         boxes: boxes_data,
//         scores: scores_data,
//         classes: classes_data,
//         label: detectedLabel,
//         confidence
//       };
//     }
    
//     return null;
//   } catch (error) {
//     console.error("Detection error:", error);
//     return null;
//   } finally {
//     // Clean up tensors
//     tensors.forEach((tensor) => {
//       if (tensor && tensor.dispose) {
//         tensor.dispose();
//       }
//     });
//   }
// };