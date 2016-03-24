# HQCD

HQCD is a hierarchical framework to detect changepoints accross 
weakly-correlated and possibily inhomogenous sources via a hierarchical
setup. Typically, we classify the sources into two groups: 

1. Targets: sources which are of prime importance
2. Surrogates: sources which can explain targets but explaining these sources
   are of not prime importance.

A walkthrough demo of HQCD as applied on the Brazilian Spring can be seen at
[https://prithwi.github.io/hqcd-supplementary](https://prithwi.github.io/hqcd-supplementary).

# Datasets:

The processed datasets used in tha accompaniment [paper](./resources/main_ecml.pdf) 
are given below.

## Synthetic data:

These sources were simulated using known changepoints and changepoints
detected by various algorithms were compared against the same. 

* [True Changepoints](./data/synthetic/true_changepoints.json)
* [Target Level data](./data/synthetic/simulated_targets.csv)
* [Surrogate Level data](./data/synthetic/simulated_surrogates.csv)


## Real World Example: Protests

Processed protest counts for 3 countries are also provided. Geolocated 
Twitter chatter, more specifically intensity of keywords for the 
country of interest over time, were used as surrogates.
Typically, individual keywords are noisy and hence we clustered the keywords
into 30 groups for each country. The processed Twitter cluster counts as 
well as the keywords belonging to the clusters are given below:

* Brazil

    * [Protest counts (target)](./data/protests/Brazil/Brazil_subtypes.csv)
    * [Twitter Cluster counts (surrogate)](./data/protests/Brazil/clustered_counts_cpd_Brazil.csv)
    * [Mapping of twitter keywords to clusters](./data/protests/Brazil/clustered_keywordMap_Brazil.json)

* Uruguay

    * [Protest counts (target)](./data/protests/Uruguay/Uruguay_subtypes.csv)
    * [Twitter Cluster counts (surrogate)](./data/protests/Uruguay/clustered_counts_cpd_Uruguay.csv)
    * [Mapping of twitter keywords to clusters](./data/protests/Uruguay/clustered_keywordMap_Uruguay.json)

* Venezuela

    * [Protest counts (target)](./data/protests/Venezuela/Venezuela_subtypes.csv)
    * [Twitter Cluster counts (surrogate)](./data/protests/Venezuela/clustered_counts_cpd_Venezuela.csv)
    * [Mapping of twitter keywords to clusters](./data/protests/Venezuela/clustered_keywordMap_Venezuela.json)
